import jwt from 'jsonwebtoken'

import { pick } from 'ramda'

const createToken = (user, secret, lifeTime) =>
  jwt.sign(pick(['id', 'email', 'username', 'role'], user), secret, {
    expiresIn: `${lifeTime}m`,
  })

export default createToken
