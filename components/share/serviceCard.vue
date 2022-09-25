<template>
  <v-card
    class="transition-swing card mx-auto rounded-xl teal lighten-3"
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
            @click.stop="item.active ? fn_route(item.route) : false"
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
          imgSrc: 'https://www.img.in.th/images/bc053ea10f5aaafa0568203ae277af13.png',
          route: '/product/drinks',
          title: 'เครื่องดื่ม',
          active: true,
        },
        {
          imgSrc: 'https://www.img.in.th/images/6a0cc89850eb7a6ae3345970852021dc.png',
          route: '/product/desserts',
          title: 'ของหวาน',
          active: true,
        },
        {
          imgSrc: 'https://www.img.in.th/images/c54fc40b8de243acc37595fa63641b13.png',
          route: '/product/food',
          title: 'อาหาร',
          active: true,
        },
      ],
    }
  },
  methods: {
    fn_route(url){
      window.location = (url)
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 28px;
}
</style>