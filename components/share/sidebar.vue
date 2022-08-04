<template>
  <div>
    <v-app-bar color="brown lighten-4" dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-avatar color="brown" size="32">
        <v-icon v-text="'mdi-account'"></v-icon>
      </v-avatar>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
    }
  },
}
</script>

<style lang="scss">
.div {
  font-family: 'Kanit-Regular';
}
</style>