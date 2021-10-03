import { Loading } from 'element-ui'

let loading
let loadingCount = 0

export const showLoading = (selector) => {
  if (loadingCount === 0) {
    loading = Loading.service({
      lock: true,
      text: '加载中...',
      backgroundColor:'#fff',
      target: document.querySelector(selector)
    })
  }
  loadingCount++
}
export const endLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount--
  if (loadingCount === 0) {
    loading.close()
  }
}
