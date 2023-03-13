<template>
  <section>
    <v-toolbar color="teal" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-icon> mdi-coffee-maker-outline</v-icon>
        <span style="font-weight: bold" class="pl-2"> {{ name }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="dialog = true" v-if="show == true">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon> mdi-account</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="brown lighten-3">
          <v-list-item @click="next('/')">
            <v-list-item-title>หน้าแรก</v-list-item-title>
          </v-list-item>

          <v-list-item @click="next('/product/food')">
            <v-list-item-title>อาหาร</v-list-item-title>
          </v-list-item>

          <v-list-item @click="next('/product/drinks')">
            <v-list-item-title>เครื่องดื่ม</v-list-item-title>
          </v-list-item>

          <v-list-item @click="next('/product/desserts')">
            <v-list-item-title>ของหวาน</v-list-item-title>
          </v-list-item>

          <v-list-item @click="next('/admin')">
            <v-list-item-title>เมนูพนักงาน</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-dialog v-model="dialog" persistent width="500">
      <v-card width="500" class="justify-center">
        <v-card-title class="justify-center">
          <h1>Your's Orders</h1>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="allItem"
            :items-per-page="5"
            class="elevation-1"
          >
          </v-data-table>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="error" @click="deleteAllCart()"> ลบทั้งหมด </v-btn>
          <v-btn @click="dialog = !dialog"> ยกเลิก </v-btn>
          <v-btn color="success" @click="confirm()"> ยืนยัน </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import products from '~/store/repositories/products'
import { mapActions } from 'vuex'
export default {
  props: {
    allItem: {
      type: Array,
    },
    show: {
      type: Boolean,
    },
  },
  data() {
    return {
      drawer: false,
      name: 'Wynn Cafe',
      group: null,
      dialog: false,
      itemInCart: [],
      headers: [
        { text: 'Product ID', value: '_id' },
        { text: 'Product Name', value: 'product_name' },
        { text: 'Quantity', value: 'amount' },
      ],
    }
  },
  created() {},
  methods: {
    ...mapActions('orders', ['fn_createOrders']),
    next(path) {
      console.log(path)
      this.$router.push(path)
    },
    async deleteAllCart() {
      localStorage.clear()
      await this.$router.push('/')
    },
    async confirm() {
      let payload = []
      for (let i = 0; i < this.allItem.length; i++) {
        let data = {
          product_id: this.allItem[i]._id,
          product_amount: this.allItem[i].amount,
        }
        payload.push(data)
      }
      this.$swal({
        title: 'ต้องการสั่งสินค้าหรือไม่',
        text: 'ท่านต้องการสั่งสินค้าหรือไม่',
        icon: 'question',
        confirmButtonColor: '#4BB543',
        showConfirmButton: true,
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await this.fn_createOrders(payload)
          console.log(resp)
          if (resp.success == true) {
            this.$swal({
              title: 'สำเร็จ',
              text: 'ท่านสั่งซื้อสินค้าสำเร็จ',
              icon: 'success',
              showConfirmButton: false,
              showCancelButton: false,
              timer: 3000
            }).then(() => {
              window.location = '/'
            })
          } else {
            this.$swal({
              title: 'ไม่สำเร็จ',
              text: 'ท่านสั่งซื้อสินค้าสำเร็จ กรุณาตรวจเช็คสินค้ากับพนักงาน',
              icon: 'error',
              showConfirmButton: false,
              showCancelButton: false,
            }).then(() => {
              window.location = '/'
            })
          }
        }
      })
    },
  },
}
</script>

<style lang="scss">
.div {
  font-family: 'Kanit-Regular';
}
</style>
