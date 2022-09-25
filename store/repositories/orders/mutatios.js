export const SET_ORDERS_LIST = 'SET_ORDERS_LIST'
export const SET_ORDERS_DETAIL = 'SET_ORDERS_DETAIL'
export default {
  [SET_ORDERS_LIST]: (state, payload) => {
    state.orders_list = payload
  },
  [SET_ORDERS_DETAIL]: (state, payload) => {
    state.orders_detail = payload
  },
}