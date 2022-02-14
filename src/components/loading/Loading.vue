<template>
  <Transition name="el-loading-fade">
    <div
      :class="['el-loading-mask', data.customClass, data.fullscreen ? 'is-fullscreen' : '']"
      :style="{backgroundColor: data.background}">
      <div class="el-loading-spinner">
        <svg class="circular" viewBox="">
          <circle class="path" cx="50" cy="50" r="20" fill="none"></circle>
        </svg>
        <p class="el-loading-text">{{ data.text }}</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
// const props = 
</script>

<style lang="scss">

</style>
