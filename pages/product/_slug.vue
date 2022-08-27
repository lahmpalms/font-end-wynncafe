<template>
  <v-responsive class="navbar-top brown lighten-4" :aspect-ratio="16 / 9" fluid>
    <Sidebar></Sidebar>
    <template>
      <v-container class="brown lighten-4" fluid>
        <v-row class="d-flex justify-center text-center" align="center">
          <v-col class="text-center">
            <span style="font-weight: bold; font-size: 50px; color: black">
              {{ item.product_name }}
            </span>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center text-center" align="center">
          <v-col class="text-center">
            <v-card class="mx-auto brown lighten-5" max-width="500">
              <v-img :src="item.product_img" height="400" width=""></v-img>
              <v-card-title> {{ item.product_name }} </v-card-title>
              <v-card-subtitle>
                ราคา {{ item.product_price }} บาท
              </v-card-subtitle>
              <v-card-actions>
                <v-btn color="success" outlined rounded @click="addToCart(item._id)">
                  <v-icon> mdi-cart </v-icon>
                  ADD TO CART
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="true">
                  <v-divider></v-divider>

                  <v-card-text>
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
import { mapActions, mapGetters } from 'vuex'
import Sidebar from '~/components/share/sidebar.vue'
export default {
  data() {
    return {
      cart: [],
      amount: 1
    }
  },
  created() {
    const { slug } = this.$route.params
    console.log('slug', slug)
    this.getProductDetail(slug)
    const arr = localStorage.getItem('cart')
    console.log(arr)
  },
  computed: {
    ...mapGetters('products', ['getProduct_detail']),
    item() {
      return this.getProduct_detail
    },
  },
  methods: {
    ...mapActions('products', ['getProductDetail']),
    addToCart(id) {
      console.log(id)
      const data = {
        _id : id,
        amount: this.amount
      }
      if ( data._id == data._id ) {
        this.amount ++
        this.cart.push(data)
      }
      console.log(this.cart);
    },
  },
  components: { Sidebar },
}
</script>

<style>
</style>