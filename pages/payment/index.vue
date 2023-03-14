<template>
  <v-responsive>
    <v-card elevation="0">
      <v-card-text>
        <v-card class="rounded-lg" color="#C8B6A6">
          <v-card-text>
            <v-row justify="center">
              <v-col align="center">
                <h1>PAYMENT</h1>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col>
                <span style="text: bold; color: black; font-size: 18px"
                  >รายการ</span
                >
              </v-col>
              <v-col>
                <span style="text: bold; color: black; font-size: 18px"
                  >จำนวน</span
                >
              </v-col>
              <v-col>
                <span style="text: bold; color: black; font-size: 18px"
                  >รวม</span
                >
              </v-col>
            </v-row>
            <v-row v-for="(item, index) in orderListItem" :key="index">
              <v-col>
                {{ item.product_name }}
              </v-col>
              <v-col> {{ item.product_amount }} </v-col>
              <v-col> {{ item.product_amount * item.product_price }} </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col class="text-right">
                รวมเป็นเงิน
                <span class="text-h5"> {{ orderTotal }} </span> บาท
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-card-text>
        <p>ทดสอบจ่ายเงิน</p>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col>
            <v-btn color="green" @click="paymentFunctions('success')">
              จ่ายเงินสำเร็จ
            </v-btn></v-col
          >
          <v-col>
            <v-btn color="red" @click="paymentFunctions('fail')">
              จ่ายเงินไม่สำเร็จ
            </v-btn></v-col
          >
          <v-col>
            <v-btn @click="paymentFunctions('cancel')">
              ยกเลิกการจ่ายเงิน
            </v-btn></v-col
          >
        </v-row>
      </v-card-text>
    </v-card>
  </v-responsive>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  asyncData({ query }) {
    const { orderId } = query
    return {
      orderId: orderId,
    }
  },
  created() {
    console.log(this.orderId)
  },
  computed: {
    orderListItem() {
      let a = []
      if (localStorage.getItem('ordersList')) {
        a = [...JSON.parse(localStorage.getItem('ordersList'))]
      } else {
        a = []
      }
      return a
    },

    orderTotal() {
      let total = 0
      for (const item of this.orderListItem) {
        total += item.product_amount * item.product_price
      }
      return total
    },
  },
  methods: {
    ...mapActions('orders', ['payment']),
    async paymentFunctions(status) {
      console.log('status', status)
      console.log(this.orderId)
      const payload = {
        ordersId: this.orderId,
        status: status,
      }
      console.log(payload)
      if (status == 'success') {
        const resp = await this.payment(payload)
        if (resp.success == true) {
          this.$swal({
            title: 'สำเร็จ',
            text: 'ดำเนินการสั่งอาหารสำเร็จ',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 5000,
          }).then(() => {
            localStorage.clear('orderList')
            window.location = '/'
          })
        } else {
          this.$swal({
            title: 'ไม่สำเร็จ',
            text: 'เกิดข้อผิดพลาดกรุณาติดต่อเจ้าหน้าที่',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 5000,
          }).then(() => {
            localStorage.clear('orderList')
            window.location = '/'
          })
        }
      } else if (status == 'fail') {
        const resp = await this.payment(payload)
        if (resp.success == true) {
          this.$swal({
            title: 'ไม่สำเร็จ',
            text: 'ทำการจ่ายเงินไม่สำเร็จ',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 5000,
          }).then(() => {
            localStorage.clear('orderList')
            window.location = '/'
          })
        } else {
          this.$swal({
            title: 'ไม่สำเร็จ',
            text: 'เกิดข้อผิดพลาดกรุณาติดต่อเจ้าหน้าที่',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 5000,
          }).then(() => {
            window.location = '/'
          })
        }
      } else {
        const resp = await this.payment(payload)
        if (resp.success == true) {
          this.$swal({
            title: 'ไม่สำเร็จ',
            text: 'ท่านทำการยกเลิกการจ่ายเงิน',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 5000,
          }).then(() => {
            window.location = '/'
          })
        } else {
          this.$swal({
            title: 'ไม่สำเร็จ',
            text: 'เกิดข้อผิดพลาดกรุณาติดต่อเจ้าหน้าที่',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 5000,
          }).then(() => {
            window.location = '/'
          })
        }
      }
    },
  },
}
</script>

<style></style>
