import { STRING, INTEGER } from 'sequelize'
import db from 'db'

const RefreshToken = db.define(
  'refresh-token',
  {
    userId: {
      type: INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    refreshToken: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: 96,
      },
    },
    fingerprint: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    expiresIn: {
      type: 'TIMESTAMP',
      defaultValue: db.literal("CURRENT_TIMESTAMP + INTERVAL '7d'"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
)

RefreshToken.findByUserId = async userId => {
  const token = await RefreshToken.findOne({
    where: { userId },
  })
  return token
}

RefreshToken.findByRefreshToken = async myToken => {
  const token = await RefreshToken.findOne({
    where: { refreshToken: myToken },
  })
  return token
}

RefreshToken.findByFingerprint = async (fingerprint, userId) => {
  const token = await RefreshToken.findOne({
    where: { fingerprint, userId },
  })
  return token
}

export default RefreshToken
