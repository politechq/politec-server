import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import http from 'http'
import jwt from 'jsonwebtoken'

import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { EmailAddressResolver, TimestampResolver } from 'graphql-scalars'
import Void from 'scalars/void'

import {
  __,
  always,
  applyTo,
  assoc,
  filter,
  forEach,
  ifElse,
  isNil,
  keys,
  map,
  pipe,
  prop,
  reduce,
  tryCatch,
  unless,
} from 'ramda'
import { isFalse, isTruthy } from 'ramda-adjunct'
import { dotPathOr } from 'ramda-extension'

import { core, data, messenger, security } from './modules'

import db from './db'
import testScenario from './test-scenario'

const { SERVER_PORT: port } = process.env

const app = express()

app.use(cookieParser())
app.use('/files', express.static('files'))
app.disable('x-powered-by')

const modules = [core, data, messenger, security]

const getSchemas = map(module => prop('schema', module))

const getResolvers = pipe(
  map(module => prop('resolvers', module)),
  filter(elem => elem),
)

const getModels = reduce(
  (result, module) => ({ ...result, ...prop('models', module) }),
  {},
)

const getCurrentUser = pipe(
  dotPathOr(null, 'headers.x-token'),
  unless(
    isNil,
    tryCatch(token => jwt.verify(token, process.env.SECRET), always(null)),
  ),
)

const models = getModels(modules)

forEach(
  modelKey =>
    pipe(
      dotPathOr(false, `${modelKey}.associate`),
      unless(isFalse, applyTo(models)),
    )(models),
  keys(models),
)

const server = new ApolloServer({
  introspection: true,
  playground: true,
  schema: makeExecutableSchema({
    typeDefs: getSchemas(modules),
    resolvers: [
      ...getResolvers(modules),
      {
        EmailAddress: EmailAddressResolver,
        Timestamp: TimestampResolver,
        Void,
      },
    ],
  }),
  context: ifElse(
    pipe(
      prop('connection'),
      isTruthy,
    ),
    always({ models }),
    ({ req, res }) =>
      pipe(
        getCurrentUser,
        assoc('currentUser', __, {
          models,
          secret: process.env.SECRET,
          req,
          res,
        }),
      )(req),
  ),
})

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: {
    credentials: true,
    origin: process.env.CLIENT_URL,
  },
})

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

export default {
  start: db.sync({ force: true }).then(() => {
    testScenario(getModels(modules))
    httpServer.listen({ port })
  }),
}
