<script setup>

import apiClient from "@/api.js";

import Header from "@/components/Header.vue";

</script>

<template>

  <div class="container">
    
    <Header />

    <main>
      <router-view></router-view> <!-- 페이지별 컴포넌트 표시 -->
    </main>

  </div>

</template>

<style scoped>

header {
  background: white;
  color: black;
  padding: 20px;
  text-align: center;
}

nav {
  /* justify-content: space-between; */
  max-width: 1000px;
  margin: 0 auto;
}

main {
  padding: 20px;
}

</style>