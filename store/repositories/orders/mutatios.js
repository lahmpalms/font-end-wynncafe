export const SET_ORDERS_LIST = 'SET_ORDERS_LIST'
export default {
  [SET_ORDERS_LIST]: (state, payload) => {
    state.orders_list = payload
  },
}