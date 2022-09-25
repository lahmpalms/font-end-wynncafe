import actions from "./actions"
import getters from "./getters"
import mutations from "./mutatios"
const state = () => ({
  orders_list: [],
})

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}