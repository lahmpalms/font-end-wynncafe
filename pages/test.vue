<template>
  <div>
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
      <!-- <v-subheader>{{ type }}</v-subheader> -->
      <v-row class="mt-2">
        <v-col>
          <span style="font-weight: bold"> รายการอาหารทั้งหมด </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="pa-1">
          <ProductCard
            :item="getProduct_list"
            :width="xs ? '180' : '250'"
            :height="xs ? '200' : '270'"
          ></ProductCard>
        </v-col>
      </v-row>
      <!-- <pre> {{ getProduct_list }}</pre> -->
    </v-container>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>