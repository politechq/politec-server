import curry from './curry'

const reduce = curry((f, x, xs) => xs.reduce(f, x))

export default reduce
