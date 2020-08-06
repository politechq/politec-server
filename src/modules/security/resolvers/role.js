import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

import {
  __,
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
  pick,
} from 'ramda'
import { dotPath } from 'ramda-extension'

const role = combineResolvers(
  isAuthenticated,
  compose(
    andThen(identity),
    converge(call, [
      compose(
        flip(invoker(1, 'findOne')),
        dotPath('models.Role'),
        nthArg(2),
      ),
      applySpec({
        where: compose(
          pick(['id']),
          nthArg(1),
        ),
        include: compose(
          append(__, []),
          dotPath('models.User'),
          nthArg(2),
        ),
      }),
    ]),
  ),
)

export default role
