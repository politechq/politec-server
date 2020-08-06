import { INTEGER } from 'sequelize'
import db from 'db'

const UserMessages = db.define('chat-messages', {
  chatId: INTEGER,
  messageId: INTEGER,
})

export default UserMessages
