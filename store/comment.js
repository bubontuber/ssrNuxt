export const actions = {
  async create ({ commit }, payload) {
    try {
      return await this.$axios.$post('api/comments', payload)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}
