import db from 'db'

const Chat = db.define('chat', {
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: db.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
})

Chat.associate = ({ User, Message }) => {
  Chat.belongsToMany(User, {
    through: 'user-chats',
  })
  Chat.belongsToMany(Message, {
    through: 'chat-messages',
  })
}

export default Chat
