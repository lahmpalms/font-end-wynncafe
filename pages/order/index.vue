<template>
  <v-responsive>
    <v-carousel cycle :height="height" hide-delimiter-background show-arrows>
      <v-carousel-item v-for="(slide, i) in coverImages" :key="i">
        <v-img :height="height" :src="slide.src"></v-img>
      </v-carousel-item>
    </v-carousel>
    <v-card class="mt-n4 rounded-t-xl" flat color="#F1DEC9">
      <v-card-text>
        <v-row class="text-right">
          <v-col>
            <v-btn elevation="0" text>
              <span
                class="text-decoration-underline"
                @click="openDialogOrders()"
                >รายการคำสั่งซื้อ</span
              >
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              rounded
              elevation="0"
              color="success"
              :disabled="orderListItem && orderListItem.length <= 0"
              @click="goToPayment()"
            >
              ชำระเงิน
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col v-for="(item, index) in getProduct_list" :key="index">
            <ProductCard :page="'allproduct'" :item="item"></ProductCard>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <DialogOrderlist
      :dialog="dialogOrder"
      @closeDialogOrder="dialogOrder = false"
    ></DialogOrderlist>
  </v-responsive>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductCard from '~/components/itemCard/productCard.vue'
export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      dialogOrder: false,
      search: '',
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
    orderListItem() {
      let a = []
      if (localStorage.getItem('ordersList')) {
        a = [...JSON.parse(localStorage.getItem('ordersList'))]
      } else {
        a = []
      }
      return a
    },
  },
  async created() {
    await this.getAllProduct()
  },
  methods: {
    ...mapActions('products', ['getAllProduct']),
    ...mapActions('orders', ['fn_createOrders']),
    openDialogOrders() {
      this.dialogOrder = true
    },
    goToPayment() {
      this.$swal({
        title: 'ดำเนินการ',
        text: 'ท่านต้องการชำระเงินใช่หรือไม่',
        icon: 'question',
        confirmButtonColor: '#4BB543',
        showConfirmButton: true,
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await this.fn_createOrders(this.orderListItem)
          if (resp.success == true) {
            this.$router.push(`/payment?orderId=${resp.data._id}`)
          } else {
            this.$swal({
              title: 'ไม่สำเร็จ',
              text: 'ท่านสั่งซื้อสินค้าสำเร็จ กรุณาตรวจเช็คสินค้ากับพนักงาน',
              icon: 'error',
              showConfirmButton: false,
              showCancelButton: false,
              timer: 5000
            }).then(() => {
              window.location.reload()
            })
          }
        }
      })
    },
  },
}
</script>

<style></style>
