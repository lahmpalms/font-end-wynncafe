<template>
  <v-card class="ma-4 teal darken-3" height="300" width="200">
    <!-- {{ item }} -->
    <v-img :src="item.product_img" width="200" height="200"></v-img>
    <v-card-text>
      <v-row>
        <v-col class="d-flex justify-center mt-2 ma-0">
          <span style="font-weight: bold; color: white;">
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
        <v-row>
          <v-col>
            <v-icon dense @click="productDetail(item._id)"> mdi-list-box-outline </v-icon>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
    <v-row class="fill-height" align="center" justify="center">
      <v-scale-transition> </v-scale-transition>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      model: null,
    }
  },
  methods: {
    productDetail(prd_id) {
      console.log(prd_id);
      this.$router.push(`/product/${prd_id}`)
    }
  }
}
</script>

<style>
</style>