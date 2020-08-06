import { nanoid } from 'nanoid'
import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

import {
  andThen,
  call,
  compose,
  converge,
  flip,
  identity,
  invoker,
  mergeLeft,
  nthArg,
  pick,
} from 'ramda'
import { dotPath } from 'ramda-extension'

const addUser = combineResolvers(
  isAuthenticated,
  compose(
    andThen(identity),
    converge(call, [
      compose(
        flip(invoker(1, 'create')),
        dotPath('models.User'),
        nthArg(2),
      ),
      compose(
        mergeLeft({ roles: [] }),
        mergeLeft({ password: nanoid(8) }),
        pick(['email', 'firstName', 'lastName']),
        nthArg(1),
      ),
    ]),
  ),
)

export default addUser
