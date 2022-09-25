<template>
  <section>
    <v-toolbar color="teal" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-icon> mdi-coffee-maker-outline</v-icon>
        <span style="font-weight: bold" class="pl-2"> {{ name }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
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
  </section>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      name: 'Wynn Cafe',
      group: null,
    }
  },
  methods: {
    next(path) {
      console.log(path)
      this.$router.push(path)
    },
  },
}
</script>

<style lang="scss">
.div {
  font-family: 'Kanit-Regular';
}
</style>