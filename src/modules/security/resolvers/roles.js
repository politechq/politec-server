import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

const roles = combineResolvers(
  isAuthenticated,
  async (parent, { offset, limit }, { models: { Role, User } }) => {
    const roleList = await Role.findAll({
      include: [
        User,
        /*
         * {
         *   model: User,
         *   as: 'createdBy',
         * },
         */
      ],
      order: [['id', 'ASC']],
      offset,
      limit,
    })
    return roleList
  },
)

export default roles
