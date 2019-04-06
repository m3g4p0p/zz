export const toObject = (prop, value) => value && { [prop]: value }

export const tap = callback => value => {
  callback(value)
  return value
}

export const removeElement = element => element.parentNode.removeChild(element)

export const getValue = (...path) => object => path.reduce((result, prop) => {
  return typeof result === 'object' ? result[prop] : undefined
}, object)
