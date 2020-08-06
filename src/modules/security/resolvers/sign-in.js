import { UserInputError } from 'apollo-server'

import { equals } from 'ramda'

import createToken from '../helpers/create-token'
import createRefreshToken from '../helpers/create-refresh-token'

const signIn = async (
  _,
  { email, password, fingerprint },
  { models: { User, RefreshToken }, secret, res },
) => {
  const user = await User.findByEmail(email)

  if (!user) {
    throw new UserInputError('User not found', {
      invalidArgs: 'email',
      errorCode: 'user-not-found',
    })
  }

  const isValid = await user.validatePassword(password)

  if (!isValid) {
    throw new UserInputError('Invalid password', {
      invalidArgs: 'password',
      errorCode: 'invalid-password',
    })
  }

  const tokenLifeTime = 30
  const token = createToken(user, secret, tokenLifeTime)
  const refreshToken = createRefreshToken()

  const oldToken = await RefreshToken.findByFingerprint(fingerprint, user.id)

  await RefreshToken.create({
    userId: user.id,
    refreshToken,
    fingerprint,
  })

  const POLITEC_REFRESH_TOKEN = 'POLITEC_REFRESH_TOKEN'
  res.cookie(POLITEC_REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    security: equals(process.env.NODE_ENV, 'production'),
    maxAge: 1000 * 60 * 60 * 24 * 7,
  })

  return { token, refreshToken }
}

export default signIn
