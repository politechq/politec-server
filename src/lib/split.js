import curry from './curry'

const split = curry((separator, string) => string.split(separator))

export default split
