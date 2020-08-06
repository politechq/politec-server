import { Op as op } from 'sequelize'

import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

const currentUserChats = combineResolvers(
  isAuthenticated,
  async (
    parent,
    { offset, limit },
    { currentUser, models: { Chat, Message, User } },
  ) => {
    const chatList = await Chat.findAll({
      /*
       * include: [
       *   Message,
       *   {
       *     model: User,
       *     where: {
       *       id: currentUser.id,
       *     },
       *   },
       * ],
       */
      include: [User],
      where: {
        userId: currentUser.id,
      },
      offset,
      limit,
    })
    return chatList
  },
)

export default currentUserChats
