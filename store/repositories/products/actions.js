import { SET_PRODUCT_LIST } from './mutations'

export default {
  async getAllProduct ( { commit }, payload) {
    try {
      const response = await this.$axios.get(`/products`)
      const { data: arr } = response.data
      commit(SET_PRODUCT_LIST, arr)
    } catch (error) {
      commit(SET_PRODUCT_LIST, [])
    }
  },
  async createProduct ( { commit }, payload) {
    try {
      const response = await this.$axios.post(`/products`, payload)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}