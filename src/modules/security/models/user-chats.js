import { INTEGER } from 'sequelize'
import db from 'db'

const UserRoles = db.define('user-chats', {
  userId: INTEGER,
  chatId: INTEGER,
})

export default UserRoles
