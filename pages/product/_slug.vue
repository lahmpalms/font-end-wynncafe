<template>
  <v-responsive class="navbar-top brown lighten-4" :aspect-ratio="16 / 9" fluid>
    <Sidebar :allItem="stored ? stored : []" :show="true"></Sidebar>
    <template>
      <v-container class="teal lighten-4" fluid>
        <v-row class="d-flex justify-center text-center" align="center">
          <v-col class="text-center">
            <span style="font-weight: bold; font-size: 50px; color: black">
              {{ item.product_name }}
            </span>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center text-center" align="center">
          <v-col class="text-center">
            <v-card class="mx-auto teal darken-3" max-width="500">
              <v-img :src="item.product_img" height="400" width=""></v-img>
              <v-card-title class="white--text">
                {{ item.product_name }}
              </v-card-title>
              <v-card-subtitle class="white--text">
                ราคา {{ item.product_price }} บาท
              </v-card-subtitle>
              <v-card-actions>
                <v-btn
                  color="success"
                  rounded
                  @click="addToCart(item._id, item.product_name)"
                >
                  <v-icon> mdi-cart </v-icon>
                  ADD TO CART
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="true">
                  <v-divider></v-divider>

                  <v-card-text class="white--text">
                    {{ item.product_detail }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-responsive>
</template>

<script>
import { add, total, list } from 'cart-localstorage'
import { mapActions, mapGetters } from 'vuex'
import Sidebar from '~/components/share/sidebar.vue'
export default {
  data() {
    return {
      cart: [],
      stored: null,
    }
  },
  async created() {
    const { slug } = this.$route.params
    console.log('slug', slug)
    this.getProductDetail(slug)
    this.stored = JSON.parse(localStorage.getItem('cart'))
    if (this.stored) {
      for (const item of this.stored) {
        this.cart.push(item)
      }
    }

    console.log(this.cart)
  },
  computed: {
    ...mapGetters('products', ['getProduct_detail']),
    item() {
      return this.getProduct_detail
    },
  },
  methods: {
    ...mapActions('products', ['getProductDetail']),
    async addToCart(id, name) {
      console.log(id)
      console.log(name)
      let data = {
        _id: id,
        amount: 1,
        product_name: name,
      }
      const productIncart = this.cart.find((item) => {
        return item._id === data._id
      })

      if (!productIncart) {
        this.cart.push(data)
      } else if (productIncart._id == data._id) {
        productIncart.amount += 1
      } else {
        this.cart.push(data)
        const x = this.cart.find((item) => {
          return true
        })
        if (x) {
          x._id == data._id ? (x.amount += 1) : null
        }
      }
      // console.log(this.cart)
      localStorage.setItem('cart', JSON.stringify(this.cart))
      console.log(this.stored)
    },
  },
  components: { Sidebar },
}
</script>

<style></style>
