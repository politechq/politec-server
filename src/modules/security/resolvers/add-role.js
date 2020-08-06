import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

const addRole = combineResolvers(
  isAuthenticated,
  async (parent, { name, code }, { currentUser, models: { Role } }) => {
    const userId = currentUser.id
    const role = await Role.create({
      name,
      code,
      createdBy: currentUser,
    })
    return role
  },
)

export default addRole
