<template>
  <v-row class="py-2">
    <v-col align-self="center">
      <span class="text-medium" v-text="header"></span>
    </v-col>
    <v-col class="py-0" align-self="center" cols="auto" v-if="show">
      <v-btn
        class="text-medium"
        color="brown lighten-3"
        rounded
        text
        v-text="share_view_all"
        @click.stop="$router.push(`${route}`)"
      ></v-btn>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    header: {
      type: String,
      default: '',
    },
    route: {
      type: String,
      default: '/',
    },
    show: {
      type: Boolean,
      default: false,
    },
    close: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      share_view_all: "ทั้งหมด",
    }
  },
}
</script>
<style lang="scss" scoped>
.text-meduim-primary {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #1166fc;
}
</style>