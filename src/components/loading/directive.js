import { isRef, ref } from 'vue'
import { isObject, isString, hyphenate } from './utils'
import { Loading } from './service'

const INSTANCE_KEY = Symbol('ElLoading')

const createInstance = (el, binding) => {
  const vm = binding.instance

  const getBindingProp = key => {
    return isObject(binding.value) ? binding.value[key] : undefined
  }

  const resloveExpression = (key) => {
    const data = (isString(key) && vm?.[key]) || key
    if (data) {
      return ref(data)
    } else {
      return data
    }
  }

  const getProp = name => {
    return resloveExpression(
      getBindingProp(name) || el.getAttribute(`element-loading-${hyphenate(name)}`)
    )
  }

  const fullscreen = getBindingProp('fullscreen') ?? binding.modifiers.fullscreen

  const options = {
    text: getProp('text'),
    svg: getProp('svg'),
    svgViewBox: getProp('svgViewBox'),
    spinner: getProp('spinner'),
    background: getProp('background'),
    customClass: getProp('customClass'),
    fullscreen,
    target: getBindingProp('target') ?? (fullscreen ? undefined : el),
    body: getBindingProp('body') ?? binding.modifiers.body,
    lock: getBindingProp('lock') ?? binding.modifiers.lock,
  }

  el[INSTANCE_KEY] = {
    options,
    instance: Loading(options)
  }
}

const updateOptions = (newOptions, originalOptions) => {
  for (const key of Object.keys(originalOptions)) {
    if (isRef(originalOptions[key])) {
      originalOptions[key].value = newOptions[key]
    }
  }
}

export const vLoading = {
  mounted(el, binding) {
    if (binding.value) {
      createInstance(el, binding)
    }
  },
  updated(el, binding) {
    const instance = el[INSTANCE_KEY]
    if (binding.oldValue !== binding.value) {
      if (binding.value && !binding.oldValue) {
        createInstance(el, binding)
      } else if (binding.value && binding.oldValue) {
        if (isObject(binding.value)) {
          updateOptions(binding.value, instance?.options)
        }
      } else {
        instance?.instance.close()
      }
    }
  },
  unmounted(el) {
    el[INSTANCE_KEY]?.instance.close() 
  }
}