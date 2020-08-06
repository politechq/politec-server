import { INTEGER } from 'sequelize'
import db from 'db'

const UserRoles = db.define('user-roles', {
  userId: INTEGER,
  roleId: INTEGER,
})

export default UserRoles
