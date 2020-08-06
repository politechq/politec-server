import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

import {
  andThen,
  apply,
  applySpec,
  applyTo,
  call,
  converge,
  identity,
  pick,
  pipe,
  prop,
} from 'ramda'
import { dotPath } from 'ramda-extension'
import { context } from 'helpers'

const getCurrentUser = combineResolvers(
  isAuthenticated,
  /*
   * pipe(
   *   converge(call, [
   *     pipe(
   *       context,
   *       dotPath('models.User.findOne'),
   *     ),
   *     pipe(
   *       context,
   *       prop('currentUser'),
   *       applySpec({
   *         where: pick(['id']),
   *       }),
   *     ),
   *   ]),
   *   andThen(identity),
   * ),
   */
  async (parent, args, { currentUser, models: { User } }) => {
    const selectedUser = await User.findOne({
      where: {
        id: currentUser.id,
      },
    })
    return selectedUser
  },
)

export default getCurrentUser
