import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

import {
  __,
  always,
  append,
  andThen,
  applySpec,
  call,
  compose,
  converge,
  flip,
  identity,
  invoker,
  nthArg,
  prop,
} from 'ramda'
import { dotPath } from 'ramda-extension'

const users = combineResolvers(
  isAuthenticated,
  compose(
    andThen(identity),
    converge(call, [
      compose(
        flip(invoker(1, 'findAll')),
        dotPath('models.User'),
        nthArg(2),
      ),
      applySpec({
        include: compose(
          append(__, []),
          dotPath('models.Role'),
          nthArg(2),
        ),
        limit: compose(
          prop('limit'),
          nthArg(1),
        ),
        offset: compose(
          prop('offset'),
          nthArg(1),
        ),
        order: always([['id', 'ASC']]),
      }),
    ]),
  ),
)

export default users
