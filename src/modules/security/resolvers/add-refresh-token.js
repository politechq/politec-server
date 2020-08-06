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
  nthArg,
  pick,
} from 'ramda'
import { dotPath } from 'ramda-extension'

const addRefreshToken = combineResolvers(
  isAuthenticated,
  compose(
    andThen(identity),
    converge(call, [
      compose(
        flip(invoker(1, 'create')),
        dotPath('models.RefreshToken'),
        nthArg(2),
      ),
      pick(['userId', 'refreshToken']),
    ]),
  ),
  /*
   *   async (parent, { userId, refreshToken }, { models: { RefreshToken } }) => {
   *     await RefreshToken.create({
   *       userId,
   *       refreshToken,
   *     })
   *
   *     return null
   *   },
   */
)

export default addRefreshToken
