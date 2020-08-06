import { Op as op } from 'sequelize'

import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

const chats = combineResolvers(
  isAuthenticated,
  async (parent, args, { models: { Chat, Message, User } }) => {
    const chatList = await Chat.findAll({
      include: [Message, User],
    })
    return chatList
  },
)

export default chats
