<template>
  <v-dialog v-model="dialogEditProduct" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5 font-weight-bold">แก้ไขสินค้า</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                v-model="product_name"
                label="ชื่อสินค้า"
                rounded
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                :items="product_types_select"
                v-model="product_types"
                :value="product_types"
                outlined
                rounded
                label="ประเภทสินค้า"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                v-model="product_price"
                label="ราคาสินค้า"
                rounded
                outlined
                required
                type="Number"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="product_amount"
                label="จำนวนสินค้า"
                rounded
                outlined
                required
                type="Number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-model="product_detail"
                outlined
                label="รายละเอียดสินค้า"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="product_img"
                label="ลิงก์รูปภาพสินค้า"
                rounded
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeAndclear(true)">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="submitUpdate(detail)">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    dialogEditProduct: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: Object,
    },
  },
  data() {
    return {
      product_types_select: ['อาหาร', 'เครื่องดื่ม', 'ของหวาน'],
      product_name: '',
      product_types: '',
      product_price: '',
      product_detail: '',
      product_amount: '',
      product_img: '',
    }
  },
  watch: {
    detail: {
      immediate: false,
      handler(value) {
        console.log('199value', value)
        if (value) {
          this.product_name = value.product_name
          this.product_types = value.product_types
          this.product_price = value.product_price
          this.product_detail = value.product_detail
          this.product_amount = value.product_amount
          this.product_img = value.product_img
        }
      },
    },
  },
  methods: {
    ...mapActions('products', ['updateProduct']),
    closeAndclear(value) {
      if (value === true) {
        this.$emit('close', false)
      }
    },
    async submitUpdate(item) {
      const data = {
        id: item._id,
        product_name: this.product_name,
        product_types: this.product_types,
        product_price: this.product_price,
        product_detail: this.product_detail,
        product_amount: this.product_amount,
        product_img: this.product_img,
      }
      await this.updateProduct(data).then(() => {
        this.$swal({
          title: 'สำเร็จ',
          text: 'ดำเนินการแก้ไขสินค้าสำเร็จ',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000,
        }).then(function () {
          window.location = '/admin'
        })
      })
      this.closeAndclear()
    },
  },
}
</script>

<style>
</style>