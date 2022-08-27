import { SET_PRODUCT_LIST,SET_PRODUCT_DETAIL } from './mutations'

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
  },
  async updateProduct ( { commit }, payload) {
    try {
      console.log(payload);
      const response = await this.$axios.put(`/products/${payload.id}`, payload)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },

  async getProductDetail ( { commit }, id ) {
    try {
      const response = await this.$axios.get(`/products/${id}`)
      const { data: obj } = response.data
      commit(SET_PRODUCT_DETAIL, obj)
    } catch (error) {
      console.log(error);
      commit(SET_PRODUCT_DETAIL, {})
    }
  }
}