import curry from './curry'

const filter = curry((f, xs) => xs.filter(f))

export default filter
