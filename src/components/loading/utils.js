export const isObject = (val) => {
  return val !== null && typeof val === 'object'
}

export const isString = (val) => {
  return typeof val === 'string'
}

const cacheStringFunction = (fn) => {
  const cache = Object.create(null)
  return ((str) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  })
}

const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cacheStringFunction((str) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})
// hyphenate('aBc')

const camelizeRE = /-(\w)/g
export const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})
camelize('font-size')


const trimArr = function (s) {
  return (s || '').split(' ').filter((item) => !!item.trim())
}

export function removeClass (el, cls) {
  if (!el || !cls) {
    return
  }
  const classes = trimArr(cls)
  let curClass = el.getAttribute('class') || ''

  if (el.classList) {
    el.classList.remove(...classes)
    return
  }
  classes.forEach((item) => {
    curClass = curClass.replace(` ${item} `, ' ')
  })
  const className = trimArr(curClass).join(' ')
  el.setAttribute('class', className)
}
