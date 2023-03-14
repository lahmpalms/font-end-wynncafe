<template>
  <v-dialog v-model="dialog" max-width="800px">
    <v-card class="pa-2">
      <v-card-title>
        <span>รายการสั่งซื้อ # {{ detailInvoice._id }} </span>
      </v-card-title>
      <v-card-text>
        <div class="invoice-box">
          <table cellpadding="0" cellspacing="0">
            <tr class="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td class="title"></td>

                    <td>
                      เลขที่สั่งซื้อ #: {{ detailInvoice._id }}<br />
                      สร้างเมื่อ: {{ detailInvoice.createdAt | formatDate
                      }}<br />
                      Due: {{ detailInvoice.createdAt | formatDate }}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="information">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      83 ถนน ราษฎร์ยินดี ซอย 3, <br />
                      คอหงส์, หาดใหญ่, สงขลา 90110, <br />
                      ประเทศไทย, Hat Yai, Thailand, Songkhla
                    </td>

                    <td>
                      Wynn Cafe<br />
                      Unchisa<br />
                      wynncafe@gmail.com
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <v-row>
              <v-col cols="6">
                <span style="text: bold; color: black; font-size: 18px"
                  >รายการ</span
                >
              </v-col>
              <v-col cols="2">
                <span style="text: bold; color: black; font-size: 18px"
                  >ราคา</span
                >
              </v-col>
              <v-col cols="2">
                <span style="text: bold; color: black; font-size: 18px"
                  >จำนวน</span
                >
              </v-col>
              <v-col cols="2">
                <span style="text: bold; color: black; font-size: 18px"
                  >รวม</span
                >
              </v-col>
            </v-row>

            <v-row
              class="item"
              v-for="(item, i) in detailInvoice.productOrders"
              :key="i"
            >
              <v-col cols="6">
                <span>{{ item.product.product_name }}</span>
              </v-col>
              <v-col cols="2" class="text-center">
                <span>{{ item.product.product_price }}</span>
              </v-col>
              <v-col cols="2" class="text-center">
                <span>{{ item.qty }}</span>
              </v-col>
              <v-col cols="2" class="text-center">
                <span>{{ item.qty * item.product.product_price }}</span>
              </v-col>
            </v-row>

            <v-row class="text-right">
              <v-col cols="12">
                <span
                  >ราคาทั้งหมด
                  <span style="font-weight: bold">
                    {{ detailInvoice.total }} </span
                  >บาท</span
                >
              </v-col>
            </v-row>
          </table>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeAndclear(true)">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="changeStatusOrder()">
          เตรียมสินค้าสำเร็จ
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    detailInvoice: {
      type: Object,
    },
  },
  data() {
    return {}
  },
  filters: {
    formatDate(dateToBeFormatted) {
      if (dateToBeFormatted == '') {
        return ''
      }
      const date = new Date(dateToBeFormatted)
      var months = [
        'ม.ค.',
        'ก.พ.',
        'มี.ค.',
        'เม.ย.',
        'พ.ค.',
        'มิ.ย.',
        'ก.ค.',
        'ส.ค.',
        'ก.ย.',
        'ต.ค.',
        'พ.ย.',
        'ธ.ค.',
      ]
      var d = new Date()
      var monthName = months[date.getMonth()]
      // var time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      return `${date.getDate()} ${monthName} ${
        date.getFullYear() + 543
      } ${date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })} ${'น.'}` //th js fix
    },
  },
  methods: {
    ...mapActions('orders', ['updateOrder']),
    closeAndclear(value) {
      if (value === true) {
        this.$emit('closeDialogInvoice', false)
      }
    },
    async changeStatusOrder() {
      const payload = {
        statusCode: 'success',
        id: this.detailInvoice._id,
      }
      const resp = await this.updateOrder(payload)
      if (resp.success == true) {
        this.$swal({
          title: 'สำเร็จ',
          text: 'ดำเนินการอัพเดทสำเร็จ',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000,
        }).then(function () {
          window.location.reload()
        })
      } else {
        this.$swal({
          title: 'ไม่สำเร็จ',
          text: 'กรุณาติดต่อผู้ดูแลระบบ',
          icon: 'error',
          showConfirmButton: false,
          showCancelButton: false,
          timer: 5000,
        }).then(() => {
          window.location.reload()
        })
      }
    },
  },
}
</script>
<style scoped>
.invoice-box {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
  color: #555;
}

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}

.invoice-box table td {
  padding: 5px;
  vertical-align: top;
}

.invoice-box table tr td:nth-child(2) {
  text-align: right;
}

.invoice-box table tr.top table td {
  padding-bottom: 20px;
}

.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 40px;
}

.invoice-box table tr.heading td {
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.invoice-box table tr.details td {
  padding-bottom: 20px;
}

.invoice-box table tr.item td {
  border-bottom: 1px solid #eee;
}

.invoice-box table tr.item.last td {
  border-bottom: none;
}

.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }

  .invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}

/** RTL **/
.invoice-box.rtl {
  direction: rtl;
  font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial,
    sans-serif;
}

.invoice-box.rtl table {
  text-align: right;
}

.invoice-box.rtl table tr td:nth-child(2) {
  text-align: left;
}
</style>
