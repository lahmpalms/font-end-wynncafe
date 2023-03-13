<template>
  <v-card class="mx-auto overflow-hidden" height="400">
    <v-app>
      <v-app-bar :clipped-left="clipped" app flat :color="'#C8B6A6'">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-avatar color="primary" size="40">
          <v-icon> mdi-coffee </v-icon>
        </v-avatar>
        <v-toolbar-title class="px-2">Wynn Cafe</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item link v-for="(item, index) in menuItems" :key="index">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <Nuxt />
      </v-main>
    </v-app>
  </v-card>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      menuItems: [
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
<style lang="scss">
body {
  height: 100%;
}
.bottom {
  // bottom: 20%;
  margin-bottom: 15%;
}
#app {
  font-family: 'Kanit';
}
</style>
