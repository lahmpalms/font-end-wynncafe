import { SET_ORDERS_LIST} from './mutatios'

export default {
  async fn_getordersall ( { commit }, payload) {
    try {
      const response = await this.$axios.get(`/orders`)
      const { data: arr } = response.data
      commit(SET_ORDERS_LIST, arr)
    } catch (error) {
      commit(SET_ORDERS_LIST, [])
    }
  },
}