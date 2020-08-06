const createExpiresIn = lifeTime => {
  const expiresIn = Date.now() + lifeTime * 60 * 1000
  return expiresIn
}

export default createExpiresIn
