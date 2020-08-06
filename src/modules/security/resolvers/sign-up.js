import createToken from '../helpers/create-token'
import createRefreshToken from '../helpers/create-refresh-token'
import createExpiresIn from '../helpers/create-expires-in'
import pubsub, { EVENTS } from '../subscription'

const signUp = async (
  parent,
  { email, password, firstName, lastName },
  { models: { User }, secret },
) => {
  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
  })

  pubsub.publish(EVENTS.USER_ADDED, {
    userAdded: { user },
  })
  const tokenLifeTime = 30
  const token = createToken(user, secret, tokenLifeTime)
  const refreshToken = createRefreshToken()
  const expiresIn = createExpiresIn(tokenLifeTime)
  return { token, refreshToken, expiresIn }
}

export default signUp
