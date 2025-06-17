<script setup lang="ts">
// 导入我们新建的导航栏和页脚组件
import TheNavbar from './components/Navbar.vue'
import TheFooter from './components/Footer.vue'
</script>

<template>
  <v-app>
    <TheNavbar />

    <v-main style="background-color: #f9f9f9;">
      <router-view />
    </v-main>

    <TheFooter />
  </v-app>
</template>

<style scoped>
/* App.vue 现在不再需要任何专属样式了 */
</style>