import curry from './curry'

const forEach = curry((f, xs) => xs.map(f))

export default forEach
