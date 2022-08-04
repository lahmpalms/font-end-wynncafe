<template>
  <v-sheet :min-height="200">
    <v-carousel
      class="rounded-b-xl"
      :show-arrows-on-hover="show_arrows"
      :show-arrows="show_arrows"
      hide-delimiters
      hide-delimiter-background
      :height="'200'"
      continuous
      cycle
      :interval="3000"
    >
      <v-carousel-item
        v-for="(item, i) in img"
        :key="i"
        :src="item.src"
      >
      </v-carousel-item>
    </v-carousel>
  </v-sheet>
</template>

<script>
export default {
  props: {
    itemList: {
      type: Array,
    },
  },
  data() {
    return {
      img: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
    }
  },
  computed: {
    bannerList() {
      return this.itemList ? this.itemList : []
    },
    show_arrows() {
      return this.img.length > 1
    },
    minHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 200
        case 'sm':
          return 300
        case 'md':
          return 600
        case 'lg':
          return 700
        case 'xl':
          return 800
      }
    },
  },
}
</script>

<style>
</style>