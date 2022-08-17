<template>
  <div>
    <v-responsive class="navbar-top" :aspect-ratio="16 / 9" fluid>
      <Sidebar />
      <template>
        <v-container class="brown lighten-4" fluid>
          <v-responsive class="mx-auto pa-2" max-width="1264">
            <v-row>
              <v-col cols="3" v-for="(item, i) in product_food" :key="i">
                <v-card class="mx-auto" max-width="344">
                  <v-img
                    :src="item.product_img"
                    height="200"
                  ></v-img>

                  <v-card-title> {{ item.product_name }} </v-card-title>

                  <v-card-subtitle>
                    ราคา {{ item.product_price }} บาท
                  </v-card-subtitle>

                  <v-card-actions>
                    <v-btn color="success" outlined rounded>
                      <v-icon> mdi-cart </v-icon> add
                    </v-btn>

                    <v-spacer></v-spacer>
                    <v-btn @click="showdetail()">
                      <v-icon>
                        mdi-circle
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-responsive>
        </v-container>
      </template>
    </v-responsive>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductCard from '~/components/itemCard/productCard.vue'
import Sidebar from '~/components/share/sidebar.vue'
export default {
  data() {
    return {
      name: 'Wynn Cafe',
      show: true,
    }
  },
  computed: {
    ...mapGetters('products', ['getProduct_list']),
    xs() {
      return this.$vuetify.breakpoint.xs
    },
    product_food() {
      const food = this.getProduct_list.filter(
        (x) => x.product_types == 'อาหาร'
      )
      return food
    },
  },
  async created() {
    await this.getAllProduct()
  },
  methods: {
    ...mapActions('products', ['getAllProduct']),
  },
  components: { ProductCard, Sidebar },
}
</script>

<style>
</style>