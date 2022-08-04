import { SET_PRODUCT_LIST } from './mutations'

export default {
  async getAllProduct ( { commit }, payload) {
    try {
      const response = await this.$axios.get(`http://localhost:3000/products/`)
      const { data: arr } = response.data
      commit(SET_PRODUCT_LIST, arr)
    } catch (error) {
      commit(SET_PRODUCT_LIST, [])
    }
  }
}