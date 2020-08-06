import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

const updateUser = combineResolvers(
  isAuthenticated,
  async (parent, { id, ...props }, { models: { User } }) => {
    const selectedUser = await User.findById(id)
    await selectedUser.update({ ...props })
    return selectedUser
  },
)

export default updateUser
