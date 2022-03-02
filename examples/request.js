import axios from 'axios'
import {ElMessage} from "element-plus";

const request = axios.create({
  // withCredentials: true,
  timeout: 1000 * 60
})


// response interceptor
request.interceptors.response.use(
    ({data}) => {
      const {code, msg} = data
      if (code !== undefined) {
        if (code !== 200) {
          if (code < 500) ElMessage.warning(msg || '服务异常')
          if (code >= 500) ElMessage.error(msg || '服务异常')
          if (code === 4001) {
            clearAll()
            ElMessage.error('用户验证失败,请重新登录!')
            router.replace('/login')
          }
          return Promise.reject(data)
        }
      }
      return data
    },
    error => {
      ElMessage({
        message: error.message,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(error)
    }
)

export default request
