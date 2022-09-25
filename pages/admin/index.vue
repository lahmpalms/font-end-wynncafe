<template>
  <div>
    <v-responsive class="navbar-top" :aspect-ratio="16 / 9" fluid>
      <Sidebar />
      <template>
        <v-container class="teal lighten-4" fluid>
          <div>
            <v-container class="teal lighten-2" fluid>
              <v-responsive class="mx-auto pa-2" max-width="1264">
                <!-- จัดการคำสั่งซื้อ -->
                <v-row>
                  <v-col>
                    <h1 class="white--text">จัดการคำสั่งซื้อ</h1>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-card>
                      <v-card-title
                        ><v-text-field
                          v-model="searchOrders"
                          label="ค้นหา"
                          single-line
                          hide-details
                        ></v-text-field
                      ></v-card-title>
                      <v-data-table
                        :search="searchOrders"
                        :headers="headersOrders"
                        :items="getOrderslist"
                        :items-per-page="20"
                        class="elevation-1"
                      >
                        <template v-slot:[`item.createdAt`]="{ item }">
                          {{ item.createdAt | formatDate }}
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                          <v-icon
                            color="warning"
                            v-text="'mdi-text-box-edit-outline'"
                            @click="invoiceDetail(item._id)"
                          ></v-icon>
                          <v-icon
                            color="error"
                            v-text="'mdi-trash-can-outline'"
                            @click="deleteDialog(item._id)"
                          ></v-icon>
                        </template>
                      </v-data-table>
                    </v-card>
                  </v-col>
                </v-row>

                <!-- จัดการสินค้า -->
                <v-row>
                  <v-col>
                    <h1 class="white--text">จัดการสินค้า</h1>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      rounded
                      color="success"
                      @click="dialogAddProduct = true"
                    >
                      เพิ่มสินค้า
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-card>
                      <v-card-title
                        ><v-text-field
                          v-model="search"
                          label="ค้นหา"
                          single-line
                          hide-details
                        ></v-text-field
                      ></v-card-title>
                      <v-data-table
                        :search="search"
                        :headers="headers"
                        :items="getProduct_list"
                        :items-per-page="20"
                        class="elevation-1"
                      >
                        <template v-slot:[`item.actions`]="{ item }">
                          <v-icon
                            color="warning"
                            v-text="'mdi-text-box-edit-outline'"
                            @click="editProduct(item._id)"
                          ></v-icon>
                          <v-icon
                            color="error"
                            v-text="'mdi-trash-can-outline'"
                            @click="deleteDialog(item._id)"
                          ></v-icon>
                        </template>
                      </v-data-table>
                    </v-card>
                  </v-col>
                </v-row>
              </v-responsive>
            </v-container>
          </div>
        </v-container>
      </template>
    </v-responsive>
    <v-dialog v-model="dialogAddProduct" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5 font-weight-bold">เพิ่มรายการสินค้า</span>
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
          <v-btn color="blue darken-1" text @click="dialogAddProduct = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="createNewProduct()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <DialogProductEdit
      :dialogEditProduct="dialogEditProduct"
      :detail="getProduct_detail"
      @close="dialogEditProduct = false"
    ></DialogProductEdit>
    <Invoice
      :dialog="invoiceDialog"
      :detailInvoice="detailInvoice"
      @close="close"
    ></Invoice>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Sidebar from '~/components/share/sidebar.vue'
import DialogProductEdit from '../../components/dialog/dialogProductEdit.vue'
import Invoice from '~/components/dialog/invoice.vue'
export default {
  data() {
    return {
      invoiceDialog: false,
      search: '',
      searchOrders: '',
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      product_types_select: ['อาหาร', 'เครื่องดื่ม', 'ของหวาน'],
      page: 1,
      dialogAddProduct: false,
      dialogEditProduct: false,
      product_name: '',
      product_types: '',
      product_price: '',
      product_detail: '',
      product_amount: '',
      product_img: '',
      headers: [
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: '_id',
        },
        { text: 'ชื่อสินค้า', value: 'product_name' },
        { text: 'ประเภทสินค้า', value: 'product_types' },
        { text: 'ราคาสินค้า', value: 'product_price' },
        { text: 'จำนวนสินค้า', value: 'product_amount' },
        { text: 'Actions', value: 'actions' },
      ],
      headersOrders: [
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: '_id',
        },
        { text: 'ราคารวม', value: 'total' },
        { text: 'สถานะ', value: 'statusCode' },
        { text: 'วันที่สั่งซื้อ', value: 'createdAt' },
        { text: 'Actions', value: 'actions' },
      ],
    }
  },
  components: { Sidebar, DialogProductEdit, Invoice },
  async created() {
    await this.getAllProduct()
    await this.fn_getordersall()
  },
  computed: {
    ...mapGetters('products', ['getProduct_list', 'getProduct_detail']),
    ...mapGetters('orders', ['getOrderslist', 'getOrdersdetail']),
    detail() {
      return this.getProduct_detail
    },
    detailInvoice() {
      return this.getOrdersdetail
    },
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
    ...mapActions('products', [
      'createProduct',
      'getAllProduct',
      'getProductDetail',
      'deleteProduct',
    ]),
    ...mapActions('orders', ['fn_getordersall', 'fn_getordersdetail']),
    selectePage(value) {
      this.page = value
    },
    async createNewProduct() {
      const data = {
        product_name: this.product_name,
        product_types: this.product_types,
        product_price: this.product_price,
        product_detail: this.product_detail,
        product_amount: this.product_amount,
        product_img: this.product_img,
      }
      await this.createProduct(data).then(() => {
        this.$swal({
          title: 'สำเร็จ',
          text: 'ดำเนินการเพิ่มสินค้าสำเร็จ',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000,
        }).then(function () {
          window.location = '/admin'
        })
      })
      this.dialogAddProduct = false
    },
    async invoiceDetail(id) {
      console.log(id)
      await this.fn_getordersdetail(id)
      console.log(this.getOrdersdetail)
      this.invoiceDialog = true
    },
    async editProduct(id) {
      console.log(id)
      await this.getProductDetail(id)
      console.log(this.getProduct_detail)
      this.dialogEditProduct = true
    },
    async deleteDialog(id) {
      this.$swal({
        title: 'ยืนยันการลบสินค้า',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'red',
        confirmButtonText: ' ยืนยัน ',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.deleteProduct(id).then(() => {
            this.$swal({
              title: 'สำเร็จ',
              text: 'ดำเนินการลบสินค้าสำเร็จ',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000,
            }).then(function () {
              window.location = '/admin'
            })
          })
        }
      })
      console.log('delete id', id)
    },
    close() {
      window.location.reload()
    },
  },
}
</script>

<style></style>
