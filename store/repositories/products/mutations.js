export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST'
export const SET_PRODUCT_DETAIL = 'SET_PRODUCT_DETAIL'

export default {
  [SET_PRODUCT_LIST]: (state, payload) => {
    state.product_list = payload
  },
  [SET_PRODUCT_DETAIL]: (state, payload) => {
    state.product_detail = payload
  }
}