import curry from './curry'

const replace = curry((reg, sub, s) => s.replace(reg, sub))

export default replace
