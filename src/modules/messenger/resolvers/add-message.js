import { Op as op } from 'sequelize'

import { combineResolvers } from 'graphql-resolvers'
import isAuthenticated from 'resolvers/is-authenticated'

import { andThen, forEach, identity, ifElse, otherwise, pipe } from 'ramda'
import { isNilOrEmpty } from 'ramda-adjunct'

const addMessage = combineResolvers(
  isAuthenticated,
  async (
    parent,
    { to, text },
    { currentUser, models: { Chat, Message, User } },
  ) => {
    const users = [currentUser.id, to]
    const getChat = pipe(
      () =>
        Chat.findOne({
          include: [
            {
              model: User,
              where: {
                id: {
                  [op.in]: users,
                },
              },
            },
          ],
        }),
      otherwise(e => `Error ${e}`),
      andThen(
        ifElse(
          isNilOrEmpty,
          pipe(
            () => Chat.create(),
            otherwise(e => `Error ${e}`),
            andThen(chat => forEach(userId => chat.addUser(userId), users)),
            otherwise(e => console.log(`SAD Error ${e}`)),
            andThen(chat =>
              chat.addMessage({
                text,
              }),
            ),
          ),
          identity,
        ),
      ),
    )
    console.log('getChat()', getChat())
    return {
      id: 1,
      text: 'lol',
    }
  },
)

export default addMessage
