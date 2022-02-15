
import { camelize } from './utils'

export const getStyle = function (element, styleName) {
  if (!element || !styleName) {
    return ''
  }

  styleName = camelize(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }

  try {
    const style = element.style[styleName]
    if (style) {
      return style
    }

    const computed = document.defaultView?.getComputedStyle(element, '')
    return computed ? computed[styleName] : ''
  } catch (e) {
    return element.style[styleName]
  }
}


const trimArr = function (s) {
  return (s || '').split(' ').filter((item) => !!item.trim())
}

export function addClass(el, cls) {
  if (!el) return
  let className = el.getAttribute('class') || ''
  const curClass = trimArr(className)
  const classes = (cls || '')
    .split(' ')
    .filter((item) => !curClass.includes(item) && !!item.trim())

  if (el.classList) {
    el.classList.add(...classes)
  } else {
    className += ` ${classes.join(' ')}`
    el.setAttribute('class', className)
  }
}