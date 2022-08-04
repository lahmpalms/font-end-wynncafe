<template>
  <v-responsive>
    <v-toolbar color="brown lighten-3" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-icon> mdi-coffee-maker-outline</v-icon>
        <span style="font-weight: bold" class="pl-2"> {{ name }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container class="brown lighten-4" fluid>
      <ServiceCard></ServiceCard>
      <v-subheader>{{ type }}</v-subheader>
    </v-container>
  </v-responsive>
</template>

<script>
import Sidebar from '~/components/share/sidebar.vue'
import SlideImage from '~/components/share/slideImage.vue'
import ServiceCard from '~/components/share/serviceCard.vue'
export default {
  data() {
    return {
      name: 'Wynn Cafe',
      model: null,
    }
  },
  components: { Sidebar, SlideImage, ServiceCard },
  methods: {
    getImage() {
      const min = 550
      const max = 560

      return Math.floor(Math.random() * (max - min + 1)) + min
    },
  },
}
</script>
<style lang="scss" scoped>
.transparent {
  background-color: white !important;
  opacity: 0.5;
  border-color: transparent !important;
}
.div {
  font-family: 'Kanit-Regular';
}
</style>