import { STRING } from 'sequelize'
import db from 'db'

const Role = db.define(
  'role',
  {
    name: {
      type: STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    code: {
      type: STRING,
      unique: true,
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
  },
  {
    timestamps: true,
  },
)

Role.associate = ({ User }) => {
  Role.belongsToMany(User, {
    through: 'user-roles',
  })
  Role.belongsTo(User, {
    as: 'createdBy',
  })
}

export default Role
