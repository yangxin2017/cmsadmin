import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const UserIdKey = 'vue_admin_template_userid'
const ProjectIdKey = 'vue_admin_template_projectid'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getUserId() {
  return Cookies.get(UserIdKey)
}

export function setUserId(userId) {
  return Cookies.set(UserIdKey, userId)
}

export function removeToken() {
  Cookies.remove(TokenKey)
  Cookies.remove(ProjectIdKey)
  return Cookies.remove(UserIdKey)
}

export function setProjectId(projectId){
  return Cookies.set(ProjectIdKey, projectId)
}

export function getProjectId() {
  return Cookies.get(ProjectIdKey)
}