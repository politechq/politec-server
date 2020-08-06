import curry from './curry'

const map = curry((f, xs) => xs.map(f))

export default map
