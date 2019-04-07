export const tap = callback => value => {
  callback(value)
  return value
}

export const removeElement = element => element.parentNode.removeChild(element)

export const isIntersecting = ({ isIntersecting }) => isIntersecting

export const getValue = (...path) => object => path.reduce((result, prop) => {
  return typeof result === 'object' ? result[prop] : undefined
}, object)

export const negate = value => !value

export const pipe = fns => value => fns.reduce((result, current) => current(result), value)

export const isValueEqual = (prop, value) => object => object[prop] === value

export const isValueSet = prop => object => object[prop] !== undefined

export const sanitize = html => {
  const element = document.createElement('div')
  element.innerHTML = html
  return element.textContent
}
