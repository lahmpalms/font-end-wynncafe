<template>
  <v-card class="mx-auto rounded-lg" color="#A4907C" max-width="344">
    <v-img :src="item.product_img" height="200"></v-img>

    <v-card-title class="white--text">
      {{ item.product_name }}
    </v-card-title>

    <v-card-subtitle class="white--text">
      ราคา {{ item.product_price }} บาท
    </v-card-subtitle>
    <v-card-text>
      <p
        v-text="item.product_detail"
        style="
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        "
      ></p>
    </v-card-text>

    <v-card-actions class="text-right">
      <v-row>
        <v-col class="justify-end">
          <v-btn class="white--text" text @click="productDetail(item._id)">
            <span> รายละเอียดเพิ่มเติม </span>
            <v-icon dense> mdi-chevron-right </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text class="d-inline-block text-truncate white--text">
          {{ item.product_detail }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  methods: {
    productDetail(prd_id) {
      console.log(prd_id)
      this.$router.push(`/product/${prd_id}`)
    },
  },
}
</script>

<style></style>
