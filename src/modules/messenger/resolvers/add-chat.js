import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

const addChat = combineResolvers(
  isAuthenticated,
  async (parent, { users }, { currentuser, models: { Chat } }) => {
    await Chat.create({
      users: [currentuser.id, ...users],
    })
    return null
  },
)

export default addChat
