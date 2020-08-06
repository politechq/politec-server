import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

const messages = combineResolvers(
  isAuthenticated,
  async (parent, { chatId, offset, limit }, { models: { Message } }) => {
    const messageList = await Message.findAll({
      order: [['createdAt', 'ASC']],
      where: { chatId },
      offset,
      limit,
    })
    return messageList
  },
)

export default messages
