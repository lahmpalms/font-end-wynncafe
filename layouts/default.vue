<template>
  <v-app light>
    <v-main>
      <client-only>
        <v-container fluid>
          <Nuxt />
        </v-container>
      </client-only>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
<style lang="scss" scoped>
.bottom {
  // bottom: 20%;
  margin-bottom: 15%;
}
#app {
  font-family: 'Kanit'
}
</style>
