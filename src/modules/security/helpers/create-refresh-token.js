import { nanoid } from 'nanoid'

const createRefreshToken = () => {
  const refreshToken = nanoid(96)
  return refreshToken
}

export default createRefreshToken
