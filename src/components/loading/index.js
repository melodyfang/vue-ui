import { Loading } from './service'
import { vLoading } from './directive'

export const MLoading = {
  install (app) {
    app.directive('loading', vLoading)
    app.config.flobalProperties.$loading = Loading
  },
  directive: vLoading,
  service: Loading
}

export default MLoading

export const MLoadingService = Loading