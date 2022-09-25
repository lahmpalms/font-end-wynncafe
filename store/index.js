import products from "./repositories/products"
import orders from "./repositories/orders"

export default {
  namespaced: true,
  modules: {
    products,
    orders
  },
}
