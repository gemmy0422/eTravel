import { request, requestCache } from './request'

function dataUrl_get(min){
  return requestCache({
    url: '/data.json',
    method: 'get'
  }, min)
}

function dataUrl_post(data){
  return request({
    url: '/data.json',
    method: 'post',
    data
  })
}

export { dataUrl_get, dataUrl_post }