<template>
  <div>
    <v-responsive class="navbar-top" :aspect-ratio="16 / 9" fluid>
      <Sidebar />
      <template>
        <v-container class="teal lighten-4" fluid>
          <v-responsive class="mx-auto pa-2" max-width="1264">
            <v-row>
              <v-col cols="3" v-for="(item, i) in product_drink" :key="i">
                <v-card class="mx-auto teal darken-3" max-width="344">
                  <v-img :src="item.product_img" height="200"></v-img>

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
                      @click="productDetail(item._id)"
                    >
                      <v-icon dense> mdi-list-box-outline </v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>

                  <v-expand-transition>
                    <div v-show="show">
                      <v-divider></v-divider>

                      <v-card-text
                        class="d-inline-block text-truncate white--text"
                      >
                        {{ item.product_detail }}
                      </v-card-text>
                    </div>
                  </v-expand-transition>
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
    product_drink() {
      const food = this.getProduct_list.filter(
        (x) => x.product_types == 'เครื่องดื่ม'
      )
      return food
    },
  },
  async created() {
    await this.getAllProduct()
  },
  methods: {
    ...mapActions('products', ['getAllProduct']),
    productDetail(prd_id) {
      console.log(prd_id)
      this.$router.push(`/product/${prd_id}`)
    },
  },
  components: { ProductCard, Sidebar },
}
</script>

<style></style>
