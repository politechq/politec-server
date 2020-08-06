import { STRING } from 'sequelize'
import db from 'db'

const Message = db.define('message', {
  text: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: db.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
})

Message.associate = ({ Chat, User }) => {
  /*
   * Message.belongsTo(Chat, {
   *   through: 'chat-messages',
   * })
   */
  // Message.belongsTo(User, {
  // through: 'user-chats',
  // })
}

export default Message
