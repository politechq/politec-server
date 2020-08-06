import bcrypt from 'bcrypt'
import { INTEGER, STRING } from 'sequelize'
import db from 'db'

import createDefaultAvatar from 'modules/security/helpers/create-default-avatar'

const User = db.define(
  'user',
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
        len: [6, 128],
      },
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    firstName: {
      type: STRING,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: STRING,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: db.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    avatar: {
      type: STRING,
    },
  },
  {
    timestamps: true,
    /*
     * hooks: {
     *   beforeCreate
     * }
     */
  },
)

User.findById = async id => {
  const user = await User.findOne({
    where: { id },
  })
  return user
}

User.findByEmail = async email => {
  const user = await User.findOne({
    where: { email },
  })
  return user
}

User.beforeCreate(async user => {
  const {
    dataValues: { firstName, lastName },
  } = user
  user.password = await user.generatePasswordHash()
  user.avatar = await createDefaultAvatar(`${firstName} ${lastName}`)
})

User.prototype.generatePasswordHash = async function() {
  const saltRounds = 10
  return await bcrypt.hash(this.password, saltRounds)
}

User.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

User.associate = ({ Chat, Role }) => {
  User.belongsToMany(Chat, {
    through: 'user-chats',
  })
  User.belongsToMany(Role, {
    through: 'user-roles',
  })
  User.hasMany(Role)
}

export default User
