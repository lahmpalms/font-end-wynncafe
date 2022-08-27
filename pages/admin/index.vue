<template>
  <div>
    <v-responsive class="navbar-top" :aspect-ratio="16 / 9" fluid>
      <Sidebar />
      <template>
        <v-container class="brown lighten-4" fluid>
          <v-responsive class="mx-auto pa-2" max-width="1264">
            <v-row>
              <v-col class="d-flex">
                <v-bottom-navigation
                  class="brown lighten-4"
                  color="primary"
                  horizontal
                >
                  <v-btn @click="selectePage(1)">
                    <span>Manage Product</span>
                    <v-icon>mdi-food</v-icon>
                  </v-btn>

                  <v-btn @click="selectePage(2)" disabled>
                    <span>Favorites</span>

                    <v-icon>mdi-heart</v-icon>
                  </v-btn>

                  <v-btn @click="selectePage(3)" disabled>
                    <span>Nearby</span>

                    <v-icon>mdi-map-marker</v-icon>
                  </v-btn>
                </v-bottom-navigation>
              </v-col>
            </v-row>
          </v-responsive>
          <div v-if="page === 1">
            <v-container class="brown lighten-4" fluid>
              <v-responsive class="mx-auto pa-2" max-width="1264">
                <v-row>
                  <v-col>
                    <h1>จัดการสินค้า</h1>
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
                  <v-col cols="12">
                    <v-text-field
                      v-model="search"
                      label="ค้นหา"
                      rounded
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
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
                        ></v-icon>
                      </template>
                    </v-data-table>
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
    <DialogProductEdit :dialogEditProduct="dialogEditProduct" :detail="getProduct_detail" @close="dialogEditProduct = false"></DialogProductEdit>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Sidebar from '~/components/share/sidebar.vue'
import DialogProductEdit from '../../components/dialog/dialogProductEdit.vue'
export default {
  data() {
    return {
      search: '',
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
    }
  },
  components: { Sidebar, DialogProductEdit },
  async created() {
    await this.getAllProduct()
  },
  computed: {
    ...mapGetters('products', ['getProduct_list', 'getProduct_detail']),
    detail() {
      return this.getProduct_detail
    }
  },
  methods: {
    ...mapActions('products', [
      'createProduct',
      'getAllProduct',
      'getProductDetail',
    ]),
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
    async editProduct(id) {
      console.log(id)
      await this.getProductDetail(id)
      console.log(this.getProduct_detail)
      this.dialogEditProduct = true
    },
  },
}
</script>

<style>
</style>