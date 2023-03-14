<template>
  <v-card
    class="mx-2 rounded-xl"
    color="#A4907C"
    height="auto"
    :width="
      page == 'allproduct' ? ($vuetify.breakpoint.xs ? 'auto' : '250') : '200'
    "
  >
    <!-- {{ item }} -->
    <v-img
      :src="item.product_img"
      :width="
        page == 'allproduct' ? ($vuetify.breakpoint.xs ? 'auto' : '250') : '200'
      "
      height="200"
    ></v-img>
    <v-card-text>
      <v-row>
        <v-col class="d-flex justify-center mt-2 ma-0">
          <span class="text-truncate" style="font-weight: bold; color: white">
            {{ item.product_name }}
          </span>
        </v-col>
      </v-row>
      <div class="text-center">
        <span
          style="font-weight: lighter; color: white; font-size: 16px"
          align="center"
        >
          {{ item.product_price }} บาท
        </span>
      </div>
    </v-card-text>
    <v-card-actions v-if="page == 'allproduct'">
      <v-btn
        block
        elevation="0"
        rounded
        color="primary"
        @click="addOrders(item._id, item.product_price, item.product_name)"
      >
        <v-icon small class="px-2"> mdi-cart </v-icon> สั่งอาหาร
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
    page: {
      type: String,
    },
  },
  data() {
    return {
      model: null,
    }
  },
  methods: {
    addOrders(id, price, name) {
      const payload = {
        product_id: id,
        product_amount: 1,
        product_price: price,
        product_name: name,
      }
      if (localStorage.getItem('ordersList')) {
        let orderList = JSON.parse(localStorage.getItem('ordersList'))
        const productIncart = orderList.find((item) => {
          return item.product_id === payload.product_id
        })
        if (!productIncart) {
          orderList.push(payload)
        } else if (productIncart.product_id == payload.product_id) {
          productIncart.product_amount += 1
        } else {
          orderList.push(data)
          const x = this.orderList.find((item) => {
            return true
          })
          if (x) {
            x.product_id == payload.product_id ? (x.product_amount += 1) : null
          }
        }
        localStorage.setItem('ordersList', JSON.stringify(orderList))
        console.log(JSON.parse(localStorage.getItem('ordersList')))
      } else {
        let cartArray = []
        cartArray.push(payload)
        localStorage.setItem('ordersList', JSON.stringify(cartArray))
      }
      window.location.reload()
    },
  },
}
</script>

<style></style>
