import request from '@/utils/request'

export function login(params) {
  return request({
    // url: '/user/login',
    url: '/cms/api/login',
    method: 'post',
    params
  })
}

export function getInfo(params) {
  return request({
    url: '/cms/api/userinfo',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}