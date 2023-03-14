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
          <v-col> <v-btn color="green" @click="payment('success')"> จ่ายเงินสำเร็จ </v-btn></v-col>
          <v-col> <v-btn color="red"  @click="payment('fail')"> จ่ายเงินไม่สำเร็จ </v-btn></v-col>
          <v-col> <v-btn @click="payment('callback')"> ยกเลิกการจ่ายเงิน </v-btn></v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-responsive>
</template>

<script>
export default {
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
    payment(status) {
      console.log('status', status);
    }
  }
}
</script>

<style></style>
