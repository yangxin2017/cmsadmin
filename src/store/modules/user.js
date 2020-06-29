import { login, getInfo } from '@/api/user'
import { getAllCategorys, ssologin } from '@/api/cms'
import { getDepts } from '@/api/cmsuser'
import { getToken, setToken, removeToken, getUserId, setUserId, getProjectId, setProjectId } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    userId: getUserId(),
    token: getToken(),
    cmsuserId: '',
    name: '',
    avatar: '',
    deptId: -1,
    role: null,
    categorys: [],
    seatId: "",
    depts: [],
    projectId: getProjectId()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_DEPTID: (state, deptId) => {
    state.deptId = deptId
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PROJECTID: (state, projectId) => {
    state.projectId = projectId
  },
  SET_CATEGORYS: (state, categorys) => {
    state.categorys = categorys
  },
  SET_DEPTS: (state, depts) => {
    state.depts = depts
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_CMSUSERID: (state, cmsuserId) => {
    state.cmsuserId = cmsuserId
  },
  SET_SEATIDS: (state, seatId) => {
    state.seatId = seatId
  },
}

const actions = {
  ssologin({ commit }, token) {
    return new Promise((resolve, reject) => {
      ssologin({username: "", password: "", token: token}).then((response)=>{
        let data = response
        if(data.success){
          if(data.authToken && data.data){
            commit('SET_TOKEN', data.authToken)
            commit('SET_USERID', data.data.id)
            commit('SET_NAME', data.data.nickName)
            setToken(data.authToken)
            setUserId(data.data.id)
          }
          // if(data.url == "admin"){
          //   window.location.href = window.location.origin + "/webadmin/#/content/"
          // }
          resolve(data)
        }else{
          reject(data)
        }
      }).catch(err=>{
        reject(err)
      })
    })
  },
  // set projectId
  setProjectId({ commit }, projectId){
    return new Promise(resolve => {
      setProjectId(projectId)
      commit('SET_PROJECTID', projectId)
      resolve()
    })
  },
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        let data = response
        commit('SET_TOKEN', data.authToken)
        commit('SET_USERID', data.data.id)
        commit('SET_NAME', data.data.nickName)
        setToken(data.authToken)
        setUserId(data.data.id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      let params = {
        authToken: state.token, 
        authUserId: state.userId
      }
      getInfo(params).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, deptId, role, userId, seatIds } = data

        commit('SET_CMSUSERID', userId)
        commit('SET_NAME', name)
        commit('SET_DEPTID', deptId)
        commit('SET_ROLE', role)
        commit('SET_AVATAR', './avatar.gif')
        commit('SET_SEATIDS', seatIds)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()

      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // set categorys
  getAllCates( { commit } ) {
    return new Promise((resolve, reject) => {
      getAllCategorys({}).then(res=>{
        commit('SET_CATEGORYS', res)
        resolve(res)
      }).catch(err=>{
        reject(error)
      })
    })
  },
  //
  getAllDepts( { commit } ) {
    return new Promise((resolve, reject) => {
      getDepts().then(res=>{
        commit('SET_DEPTS', res)
        resolve(res)
      }).catch(err=>{
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}