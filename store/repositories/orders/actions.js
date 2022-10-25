import { SET_ORDERS_LIST, SET_ORDERS_DETAIL } from './mutatios'

export default {
  async fn_getordersall({ commit }, payload) {
    try {
      const response = await this.$axios.get(`/orders`)
      const { data: arr } = response.data
      commit(SET_ORDERS_LIST, arr)
    } catch (error) {
      commit(SET_ORDERS_LIST, [])
    }
  },

  async fn_getordersdetail({ commit }, id) {
    try {
      const response = await this.$axios.get(`/orders/${id}`)
      const { data: obj } = response.data
      commit(SET_ORDERS_DETAIL, obj)
    } catch (error) {
      console.log(error)
      commit(SET_ORDERS_DETAIL, {})
    }
  },

  async fn_createOrders({ commit }, payload) {
    try {
      console.log(payload)
      const resp = await this.$axios.post(`/orders`, payload)
      return resp.data
    } catch (error) {
      console.log(error.response.data)
      return error.response.data
    }
  },
}
