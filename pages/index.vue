<template>
  <v-responsive>
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

    <v-container class="brown lighten-4" fluid>
      <ServiceCard></ServiceCard>
      <!-- <v-subheader>{{ type }}</v-subheader> -->
      <v-row class="mt-2">
      <v-col>
      <span style="font-weight:bold"> รายการอาหารทั้งหมด </span>
      </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(item, index) in getProduct_list" :key="index">
          <v-card class="mx-auto" max-width="300">
            <v-img :src="item.product_img" height="200px"></v-img>
            <v-card-title>
              {{item.product_name}}
            </v-card-title>

            <v-card-subtitle>
              {{item.product_price}} THB
            </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange lighten-2" text>
                detail
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  {{item.product_detail}}
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
      <!-- <pre> {{ getProduct_list }}</pre> -->
    </v-container>
  </v-responsive>
</template>

<script>
import Sidebar from '~/components/share/sidebar.vue'
import SlideImage from '~/components/share/slideImage.vue'
import ServiceCard from '~/components/share/serviceCard.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      name: 'Wynn Cafe',
      model: null,
      show: false,
    }
  },
  computed: {
    ...mapGetters('products', ['getProduct_list']),
  },
  async created() {
    await this.getAllProduct()
  },
  components: { Sidebar, SlideImage, ServiceCard },
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