import axios from 'axios'
import md5 from 'js-md5'
import { storage } from '@/utils/storage/storage'
import store from '@/store/store'

const service = axios.create({
  timeout: 5 * 1000 // 超過5秒還沒回傳即失敗
})

service.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Access-Control-Allow-Origin": '*',
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 異常處理
service.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 404:
          store.dispatch('MSG_POPUP_HANDLER', {txt: '找不到該頁面', status: 'fail'})
          break;
        case 500:
          store.dispatch('MSG_POPUP_HANDLER', {txt: '伺服器出錯', status: 'fail'})
          break;
        case 503:
          store.dispatch('MSG_POPUP_HANDLER', {txt: '服務失效', status: 'fail'})
          break;
        default:
          store.dispatch('MSG_POPUP_HANDLER', {txt: `連接錯誤${err.response.status}`, status: 'fail'})
      }
    } else {
      store.dispatch('MSG_POPUP_HANDLER', {txt: '連接到服務器失敗', status: 'fail'})
    }
    store.dispatch('MSG_POPUP_HANDLER', {txt: '網路錯誤', status: 'fail'})
    return Promise.resolve(err)
  }
);

const baseApi = (param = {}) => {
  service.defaults.baseURL = 'https://etravel-f011c.firebaseio.com'
  return service(param)
}

const baseApiCache = (...params) => {
  return new Promise((resolve, reject) => {
    let url = params[0].url
    url = url.replace(/^\//, '').replace(/\.[^]+/, '')
    const requestHash = `${url}:${md5(JSON.stringify(params[0]))}`
    const res = storage.get(requestHash)
    const min = params[1]
  
    if(!res || (Array.isArray(res) && res.length === 0)){
      return baseApi(...params).then(response => {
        storage.set(requestHash, response, min)
        resolve(response)
      }).catch(err => {
        reject(err)
      })
    }else{
      resolve(res)
    }
  })
}

export { baseApiCache as requestCache, baseApi as request }