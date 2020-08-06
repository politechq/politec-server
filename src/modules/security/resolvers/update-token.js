import { UserInputError } from 'apollo-server'

import createToken from '../helpers/create-token'
import createRefreshToken from '../helpers/create-refresh-token'

import { equals, isNil } from 'ramda'

const updateToken = async (
  _,
  { fingerprint },
  { models: { RefreshToken, User }, secret, res, req },
) => {
  const POLITEC_REFRESH_TOKEN = 'POLITEC_REFRESH_TOKEN'
  const cookieRefreshToken = req.cookies[POLITEC_REFRESH_TOKEN]
  const userToken = await RefreshToken.findOne({
    where: {
      fingerprint,
      refreshToken: cookieRefreshToken,
    },
  })
  const { userId } = userToken
  if (isNil(userToken)) {
    throw new UserInputError('Invalid refresh token')
  }
  const tokenLifeTime = 30
  const user = await User.findById(userId)
  const token = createToken(user, secret, tokenLifeTime)
  const refreshToken = createRefreshToken()
  userToken.refreshToken = refreshToken
  await userToken.save()
  res.cookie(POLITEC_REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    security: equals(process.env.NODE_ENV, 'production'),
    maxAge: 1000 * 60 * 60 * 24 * 7,
  })
  return { token, refreshToken }
}

export default updateToken
