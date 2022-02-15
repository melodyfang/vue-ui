<script setup>
import { ref } from 'vue'

// let loading = ref(false)
// setTimeout(() => {
//   loading.value = true
// }, 1000)

import { ElLoading } from './components/loading'

ElLoading.service({
  lock: true,
  text: 'Loading',
  background: 'rgba(0, 0, 0, 0.7)',
})
</script>

<template>
  <!-- <div v-loading="loading">hello</div> -->
  <div></div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
