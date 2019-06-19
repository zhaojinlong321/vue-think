import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	token:getToken(),
    name: '',
    avatar: '',
    roles:[],
    sidebar:{
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true
    }
  },
  mutations: {
  	SET_TOKEN:(state,token)=>{
  		state.token = token
  	},
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    TOGGLE_SIDEBAR:(state)=>{
      state.sidebar.opened = !state.sidebar.opened
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    }
  },
  actions: {
  	login({commit},userinfo){
  		const { username, password } = userinfo;
  		return new Promise((resolve,reject)=>{
  			login({ac:username.trim(), se: password}).then(res=>{
  				commit('SET_TOKEN', res.token)
  				resolve(res)
  			}).catch(error=>{
  				reject(error)
  			})
  		})
  	},
    getInfo({commit,state}){
      return new Promise((resolve,reject)=>{
        getInfo(state.token).then(res=>{
          console.log(res)
          const {data}=res;
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          const { roles, name, avatar } = data;
          if(!roles || roles.length <= 0){
            reject('getInfo: roles must be a non-null array!')
          }
          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout({commit,state}){
      return new Promise((resolve,reject)=>{
        logout(state.token)
        .then(()=>{
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resetRouter()
          resolve()
        })
        .catch(error=>{
          reject(error)
        })
      })
    },
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },
    toggleSideBar({commit}){
      commit('TOGGLE_SIDEBAR')
    }
  },
  getters:{
    token: state => state.token,
    avatar: state => state.avatar,
    name: state => state.name,
    roles: state => state.roles,
    sidebar:state=>state.sidebar
  }
})
