<template>
  <div class="progress-bar">
    <div class="progress-fill" :style="{ width: value + '%' }"></div>
  </div>
</template>

<script setup>
defineProps({
  value: { type: Number, default: 0 },
})
</script>

<style scoped>
.progress-bar {
  height: 3px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  margin: 10px 14px 0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #fff;
  border-radius: 4px;
  transition: width 0.3s;
}
</style>
