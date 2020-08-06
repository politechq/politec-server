import { ForbiddenError } from 'apollo-server'
import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'
import pubsub, { EVENTS } from 'modules/security/subscription'

const deleteUser = combineResolvers(
  isAuthenticated,
  async (parent, { id }, { models: { User }, currentUser }) => {
    const user = await User.findOne({
      where: {
        id,
      },
    })
    if (id === currentUser.id) {
      throw new ForbiddenError('Cannot remove current user')
    }
    pubsub.publish(EVENTS.USER_DELETED, {
      userDeleted: { user },
    })
    user.destroy()
    return user
  },
)

export default deleteUser
