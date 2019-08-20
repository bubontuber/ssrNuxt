export const state = () => ({
  errors: null
})

export const mutations = {
  setError (state, error) {
    state.errors = error
  },
  clearError (state) {
    state.errors = null
  }
}

export const actions = {
  nuxtServerInit ({ dispatch }) {
    dispatch('auth/autoLogin')
  }
}

export const getters = {
  error: state => state.errors
}
