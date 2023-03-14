<template>
  <v-responsive>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title>
          <v-row justify="center">
            <v-col align="center">
              <span>รายการคำสั่งซื้อ</span>
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </v-card-title>
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
              <span style="text: bold; color: black; font-size: 18px">รวม</span>
            </v-col>
            <v-col> </v-col>
          </v-row>
          <v-row v-for="(item, index) in orderListItem" :key="index">
            <v-col>
              {{ item.product_name }}
            </v-col>
            <v-col> {{ item.product_amount }} </v-col>
            <v-col> {{ item.product_amount * item.product_price }} </v-col>
            <v-col cols="2">
              <v-btn x-small text color="red" @click="deleteList(index)">
                ลบ</v-btn
              ></v-col
            >
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-row>
            <v-col>
              รวมเป็นเงิน <span class="text-h5"> {{ orderTotal }} </span> บาท
            </v-col>
            <v-col cols="auto" class="text-right">
              <v-btn x-small text color="red" @click="closeDialog()"> ปิด</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-responsive>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.$vuetify.breakpoint.width)
  },
  computed: {
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

    orderTotal() {
      let total = 0
      for (const item of this.orderListItem) {
        total += item.product_amount * item.product_price
      }
      return total
    },
  },
  methods: {
    deleteList(index) {
      console.log(index)
      console.log(this.orderListItem)
      this.orderListItem.splice(index, 1)
      localStorage.setItem('ordersList', JSON.stringify(this.orderListItem))
      window.location.reload()
    },
    closeDialog() {
      this.$emit('closeDialogOrder', false)
    }
  },
}
</script>

<style></style>
