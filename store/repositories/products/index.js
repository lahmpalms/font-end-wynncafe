import actions from "./actions"
import getters from "./getters"
import mutations from "./mutations"
const state = () => ({
  product_list: []
})

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}