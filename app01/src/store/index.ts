import Vue from 'vue'
import Vuex from 'vuex'
import { constantRoutes } from '@/router'
import Cookies from 'js-cookie'
import { login, logout, getInfo } from '@/api/user'
import { getLanguage } from '@/lang/index'
import { getToken, setToken, removeToken } from '@/utils/auth'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
  	language: getLanguage(),
    token:getToken(),
  },
  mutations: {
  	SET_LANGUAGE: (state, language) => {
	    state.language = language
	    Cookies.set('language', language)
	  },
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
  	setLanguage({ commit }, language) {
	    commit('SET_LANGUAGE', language)
	  },
    login({ commit },userInfo){
      const { username, password } = userInfo;

      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password }).then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  getters:{
  	language: state => state.language,
    token: state => state.token   
  }
})
