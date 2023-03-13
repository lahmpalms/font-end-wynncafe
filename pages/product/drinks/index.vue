<template>
  <div>
    <v-responsive fluid>
      <Sidebar />
      <template>
        <v-container class="teal lighten-4" fluid>
          <v-responsive class="mx-auto pa-2" max-width="1264">
            <v-row>
              <v-col v-for="(item, i) in product_drink" :key="i">
                <ShareProductCard :item="item"></ShareProductCard>
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
