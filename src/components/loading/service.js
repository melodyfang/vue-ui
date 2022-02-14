import { isObject, isString, hyphenate } from './utils'
import { getStyle } from './dom'
import { createLoadingComponent } from './loading'
import { nextTick } from 'vue'

let fullscreenInstance = undefined

export const Loading = function(options) {
  const resolved = resolved(options)
}

export const Loading = function(options) {
  const resolved = resolveOptions(options)

  if (resolved.fullscreen && fullscreenInstance) {
    fullscreenInstance.close()
  }

  // TODO:
  const instance = createLoadingComponent({
    ...resolved,
    closed: () => {
      resolved.closed()?.()
      if (resolved.fullscreen) {
        fullscreenInstance = undefined
      }
    }
  })

  addStyle(resolved, resolved.parent, instance)
  addClassList(resolved, resolved.parent, instance)

  resolved.parent.vLoadingAddClassList = () => {
    return addClassList(resolved, resolved.parent, instance)
  }

  let loadingNumber = resolved.parent.getArrtibute('loading-number')
  if (!loadingNumber) {
    loadingNumber = '1'
  } else {
    loadingNumber = `${Number.parseInt(loadingNumber) + 1}`
  }

  resolved.parent.setAttribute('loading-number', loadingNumber)

  resolved.parent.appendChild(instance.$el)

  nextTick(() => (instance.visible.value = resolved.visible))

  if (resolved.fullscreen) {
    fullscreenInstance = instance
  }

  return instance
}

const resolveOptions = (options) => {
  let target
  if (isString(options.target)) {
    target = document.querySelector(options.target) ?? document.body
  } else {
    target = options.target || document.body
  }

  const {background, svg, svgViewBox, spinner, text, lock, customClass, visible} = options

  return {
    parent: target === document.body || options.body ? document.body : target,
    background: background || '',
    svg: svg || '',
    svgViewBox: svgViewBox || '',
    spinner: spinner || false,
    text: text || '',
    fullscreen: target === document.body && (options.fullscreen ?? true),
    lock: lock ?? false,
    customClass: customClass || '',
    visible: visible ?? true,
    target
  }
}

const addStyle = async(
  options,
  parent,
  instance
) => {
  const maskStyle = {}

  if (options.fullscreen) {
    instance.originalPosition.value = getStyle(document.body, 'position')
    instance.originalOverflow.value = getStyle(document.body, 'overflow')
  } else if (options.parent === document.body) {
    instance.originalPosition.value = getStyle(document.body, 'position')

    await nextTick()
    for (const property of ['top', 'left']) {
      const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft'
      maskLeft[property] = `${
        options.target.getBoundingClientRect()[property] +
        document.body[scroll] +
        document.documentElement[scroll] -
        parseInt(getStyle(document.body, `margin-${property}`), 10)
      }px`
    }

    for (const property of ['height', 'width']) {
      maskStyle[property] = `${
        option.target.getBoundingClientRect()[property]
      }px`
    }
  } else {
    instance.originalPosition.value = getStyle(parent, 'position')
  }

  for (const [key, value] of Object.entries(maskStyle)) {
    instance.$el.style[key] = value
  }  
}

const addClassList = (
  options,
  parent,
  instance
) => {
  if (
    instance.originalPosition.value !== 'absolute' &&
    instance.originalPosition.value !== 'fixed'
  ) {
    addClass(parent, 'el-loading-parent--relative')
  } else {
    removeClass(parent, 'el-loading-parent--relative')
  }

  if (options.fullscreen && options.lock) {
    addClass(parent, 'el-loading-parent--hidden')
  } else {
    removeClass(parent, 'el-loading-parent--hidden')
  }
}