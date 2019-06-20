import axios from 'axios'
import {Message} from 'element-ui';
const home = window.location.host;
const host = '/';
const hostUrl = '';
const service = axios.create({
  // 设置axios 请求过期时间
  // timeout: 5000,
  // 设置axios 请求前置路径
  baseURL: host,
  // 设置axios 允许跨域请求
  withCredentials: false
})
// 设置axios 请求拦截
service.interceptors.request.use(
  config => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config['crossDomain'] = true
    return config
  },
  error => {
    Promise.reject(error)
  }
)
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (response.config.responseType === 'blob') {
      return response.data
    } else if (!res) {
      let msg = '接口参数错误'
      if (res && res.message) {
        msg = res.message
      }
      Message({
        message: msg,
        type: 'error',
        duration: 2000,
        center: true
      })
      let error = new Error(res)
      return Promise.reject(error)
    } else {
      return response.data
    }
  },
  error => {
    if (error.response.status === 302) {
      let responseTextObj = error.response.data;
      top.location.href = hostUrl + responseTextObj.data;
    } else {
      Message({
        message: '访问失败',
        type: 'error',
        duration: 2 * 1000,
        center: true
      })
      return Promise.reject(error)
    }
  }
)
function fetch (obj) {
  if (!obj.url) {
    let err = new Error('请传入请求路径');
    return Promise.reject(err)
  } else if (!obj.method) {
    let err = new Error('请传入请求方式');
    return Promise.reject(err)
  }
  let servicObj = {
    method: obj.method,
    url: obj.url,
    headers: obj.headers || {},
    params: obj.params || {}
  }
  if (obj.onUploadProgress) {
    servicObj.onUploadProgress = obj.onUploadProgress
  }
  if (obj.responseType) {
    servicObj.responseType = obj.responseType
  }
  if (obj.cancelToken) {
    servicObj.cancelToken = obj.cancelToken
  }
  if (obj.method.toLocaleLowerCase() === 'get') {
    servicObj.param = obj.data || {}
  } else if (obj.method.toLocaleLowerCase() === 'post') {
    servicObj.data = obj.data || {}
  }
  return service(servicObj)
}

export default fetch
