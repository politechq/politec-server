import curry from './curry'

const join = curry((what, xs) => xs.join(what))

export default join
