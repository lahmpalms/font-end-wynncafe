<template>
  <v-responsive>
    <v-carousel cycle :height="height" hide-delimiter-background show-arrows>
      <v-carousel-item v-for="(slide, i) in coverImages" :key="i">
        <v-img :height="height" :src="slide.src"></v-img>
      </v-carousel-item>
    </v-carousel>
    <v-card class="mt-n4 rounded-t-xl" flat color="#F1DEC9">
      <v-card-text>
        <v-card class="rounded-xl" color="#C8B6A6">
          <v-card-text>
            <v-row justify="center">
              <v-col
                align="center"
                v-for="(item, index) in categoryService"
                :key="index"
              >
                <v-avatar color="primary" size="80">
                  <v-icon size="40"> {{ item.icon }}</v-icon></v-avatar
                >
                <p>
                  {{ item.title }}
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn large block class="rounded-lg" color="#F1DEC9" @click="$router.push('/order')">
                  <v-icon class="px-2"> mdi-order-bool-descending</v-icon>
                  เริ่มสั่งอาหาร</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-card-text>
        <CardHeader
          :header="alldrink"
          :show="true"
          :route="`/product/drinks`"
        ></CardHeader>
        <vue-horizontal :button="false">
          <section class="pa-1" v-for="(item, i) in product_drink" :key="i">
            <ProductCard :item="item"></ProductCard>
          </section>
        </vue-horizontal>
      </v-card-text>
      <v-card-text>
        <CardHeader
          :header="allproduct"
          :show="true"
          :route="`/product/food`"
        ></CardHeader>
        <vue-horizontal :button="false">
          <section class="pa-1" v-for="(item, i) in product_food" :key="i">
            <ProductCard :item="item"></ProductCard>
          </section>
        </vue-horizontal>
      </v-card-text>
      <v-card-text>
        <CardHeader
          :header="alldessert"
          :show="true"
          :route="`/product/desserts`"
        ></CardHeader>

        <vue-horizontal :button="false">
          <section class="pa-1" v-for="(item, i) in product_dessert" :key="i">
            <ProductCard :item="item"></ProductCard>
          </section>
        </vue-horizontal>
      </v-card-text>
    </v-card>
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
      drawer: false,
      group: null,
      cartNumber: 0,
      coverImages: [
        {
          src: 'https://cdn.pixabay.com/photo/2017/05/12/08/29/coffee-2306471_1280.jpg',
        },
        {
          src: 'https://cdn.pixabay.com/photo/2020/09/21/05/57/coffee-5589036_1280.jpg',
        },
        {
          src: 'https://cdn.pixabay.com/photo/2016/04/20/14/29/coffee-1341259_1280.jpg',
        },
        {
          src: 'https://cdn.pixabay.com/photo/2017/10/17/21/15/pair-2862155_1280.jpg',
        },
      ],
      categoryService: [
        {
          icon: 'mdi-coffee-outline',
          route: '',
          title: 'เครื่องดื่ม',
          active: true,
        },
        {
          icon: 'mdi-food-outline',
          route: '',
          title: 'อาหาร',
          active: true,
        },
        {
          icon: 'mdi-cake-variant-outline',
          route: '',
          title: 'ของหวาน',
          active: true,
        },
      ],
    }
  },
  computed: {
    ...mapGetters('products', ['getProduct_list']),
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 220
        case 'sm':
          return 400
        case 'md':
          return 500
        case 'lg':
          return 600
        case 'xl':
          return 800
      }
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
    Sidebar,
  },
  methods: {
    ...mapActions('products', ['getAllProduct']),
    getImage() {
      const min = 550
      const max = 560

      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    test() {
      this.cartNumber++
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
