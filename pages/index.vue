<template>
  <v-responsive class="navbar-top" :aspect-ratio="16 / 9" fluid>
    <template>
      <section name="toolsbar">
        <v-toolbar color="brown lighten-3" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title>
            <v-icon> mdi-coffee-maker-outline</v-icon>
            <span style="font-weight: bold" class="pl-2"> {{ name }}</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </v-toolbar>
      </section>
      
      <v-container class="brown lighten-4" fluid>
        <ServiceCard></ServiceCard>
        <v-responsive class="mx-auto pa-2" max-width="1264">
          <section name="alldrink" v-if="getProduct_list.length">
            <CardHeader :header="alldrink" :show="true"></CardHeader>
            <vue-horizontal :button="xs ? false : true">
              <section class="pa-1" v-for="(item, i) in product_drink" :key="i">
                <ProductCard :item="item"></ProductCard>
              </section>
            </vue-horizontal>
          </section>
        </v-responsive>
      </v-container>

      <v-container class="brown lighten-4" fluid>
        <v-responsive class="mx-auto pa-2" max-width="1264">
          <section name="allproduct" v-if="getProduct_list.length">
            <CardHeader :header="allproduct" :show="true"></CardHeader>
            <vue-horizontal :button="xs ? false : true">
              <section class="pa-1" v-for="(item, i) in product_food" :key="i">
                <ProductCard :item="item"></ProductCard>
              </section>
            </vue-horizontal>
          </section>
        </v-responsive>
      </v-container>

      <v-container class="brown lighten-4" fluid>
        <v-responsive class="mx-auto pa-2" max-width="1264">
          <section name="alldessert" v-if="getProduct_list.length">
            <CardHeader :header="alldessert" :show="true"></CardHeader>
            <vue-horizontal :button="xs ? false : true">
              <section
                class="pa-1"
                v-for="(item, i) in product_dessert"
                :key="i"
              >
                <ProductCard :item="item"></ProductCard>
              </section>
            </vue-horizontal>
          </section>
        </v-responsive>
      </v-container>
    </template>
  </v-responsive>
</template>

<script>
import Sidebar from '~/components/share/sidebar.vue'
import SlideImage from '~/components/share/slideImage.vue'
import ServiceCard from '~/components/share/serviceCard.vue'
import { mapActions, mapGetters } from 'vuex'
import CardHeader from '~/components/itemCard/cardHeader.vue'
import ProductCard from '~/components/itemCard/productCard.vue'
export default {
  data() {
    return {
      name: 'Wynn Cafe',
      model: null,
      show: false,
      allproduct: 'รายการอาหาร',
      alldrink: 'รายการเครื่องดื่ม',
      alldessert: 'รายการของหวาน',
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
    product_drink() {
      const drink = this.getProduct_list.filter(
        (x) => x.product_types == 'เครื่องดื่ม'
      )
      return drink
    },
    product_dessert() {
      const dessert = this.getProduct_list.filter(
        (x) => x.product_types == 'ของหวาน'
      )
      return dessert
    },
  },
  async created() {
    await this.getAllProduct()
  },
  components: {
    Sidebar,
    SlideImage,
    ServiceCard,
    ProductCard,
    CardHeader,
    ProductCard,
    ServiceCard,
  },
  methods: {
    ...mapActions('products', ['getAllProduct']),
    getImage() {
      const min = 550
      const max = 560

      return Math.floor(Math.random() * (max - min + 1)) + min
    },
  },
}
</script>
<style lang="scss" scoped>
.transparent {
  background-color: white !important;
  opacity: 0.5;
  border-color: transparent !important;
}

.div {
  font-family: 'Kanit-Regular';
}
</style>