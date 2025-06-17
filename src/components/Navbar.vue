<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <v-app-bar app color="white" elevation="1">
    <v-app-bar-title>
      <RouterLink to="/" class="text-decoration-none text-grey-darken-3">
        百合数据库
      </RouterLink>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <RouterLink to="/" custom v-slot="{ navigate }">
      <v-btn @click="navigate" text>首页</v-btn>
    </RouterLink>
    <RouterLink to="/works" custom v-slot="{ navigate }">
      <v-btn @click="navigate" text>作品列表</v-btn>
    </RouterLink>

  </v-app-bar>
</template>

<style scoped>
.v-app-bar-title a {
  font-weight: bold;
}
</style>