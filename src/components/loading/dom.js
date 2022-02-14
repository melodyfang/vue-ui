

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