import { Loading } from './service'
import { vLoading } from './directive'

export const ElLoading = {
  install (app) {
    app.directive('loading', vLoading)
    app.config.flobalProperties.$loading = Loading
  },
  directive: vLoading,
  service: Loading
}

export default ElLoading

export const ElLoadingDirective = vLoading
export const ElLoadingService = Loading