<template>
  <v-card
    class="transition-swing card mx-auto rounded-xl"
    :width="$vuetify.breakpoint.xs ? '300' : '500'"
    :height="$vuetify.breakpoint.xs ? '120' : '160'"
    outlined
  >
    <v-card-text>
      <v-row justify="center">
        <v-col
          align="center"
          align-self="center"
          v-for="(item, i) in menuList"
          :key="i"
        >
          <v-avatar
            :size="$vuetify.breakpoint.xs ? '65' : '100'"
            @click.stop="item.active ? fn_route(item.title, item.route) : false"
          >
            <v-img :src="item.imgSrc"></v-img>
          </v-avatar>
          <br />
          <span class="text-medium-2" v-text="item.title"></span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          imgSrc: require('@/assets/img/cover.jpg'),
          route: 'hostal',
          title: 'เครื่องดื่ม',
          active: false,
        },
        {
          imgSrc: require('@/assets/img/cover.jpg'),
          route: 'package',
          title: 'ของหวาน',
          active: false,
        },
        {
          imgSrc: require('@/assets/img/cover.jpg'),
          route: 'car',
          title: 'อาหาร',
          active: false,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.card {
  background: #EFEBE9;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 28px;
}
</style>