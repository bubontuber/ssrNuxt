import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: true
})

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  clearToken (state) {
    state.token = null
  }
}

export const actions = {
  autoLogin ({ dispatch }) {
    const cookieStr = process.client ? document.cookie : this.app.context.req.headers.cookie
    const cookie = Cookie.parse(cookieStr || '') || {}
    const token = cookie['jwt-token']

    if (isJwtValid(token)) {
      dispatch('setToken')
    } else {
      dispatch('logOut')
    }
  },
  async login ({ commit, dispatch }, payload) {
    try {
      const { token } = await this.$axios.$post('/api/auth/admin/login', payload)
      dispatch('setToken', token)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  setToken ({ commit }, token) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
    Cookies.set('jwt-token', token)
  },
  logOut ({ commit }) {
    this.$axios.setToken(false)
    commit('clearToken')
    Cookies.remove('jwt-token')
  },
  async createUser ({ commit }, payload) {
    try {
      await this.$axios.$post('api/auth/admin/create', payload)
    } catch (e) {
      commit('setError', e, { root: true })
    }
  }
}

export const getters = {
  isAuth: state => Boolean(state.token),
  token: state => state.token
}

function isJwtValid (token) {
  if (!token) {
    return false
  }
  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || {}

  return (new Date().getTime() / 1000) < expires
}
