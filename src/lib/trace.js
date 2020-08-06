import curry from './curry'

const trace = curry((tag, x) => {
  console.log(tag, x)
  return x
})

export default trace
