import forEach from './for-each'
import isObject from './is-object'
import keys from './keys'
import reduce from './reduce'

const merge = (...objects) =>
  reduce(
    (prev, obj) => {
      forEach(key => {
        const pVal = prev[key]
        const oVal = obj[key]
        if (isObject(pVal) && isObject(oVal)) {
          prev[key] = merge(pVal, oVal)
        } else {
          prev[key] = oVal
        }
      }, keys(obj))

      return prev
    },
    {},
    objects,
  )

export default merge
