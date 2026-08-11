<template>
  <div class="mood-sticker" @click="$emit('click')">
    <i class="ti ti-map-pin" aria-hidden="true"></i>
    <span>{{ location }}</span>
  </div>
</template>

<script setup>
defineProps({
  location: { type: String, default: '' },
})
defineEmits(['click'])
</script>

<style scoped>
.mood-sticker {
  position: absolute;
  top: 70px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(124, 158, 255, 0.18);
  border: 1px solid rgba(124, 158, 255, 0.3);
  backdrop-filter: blur(6px);
  z-index: 2;
  cursor: pointer;
}

.mood-sticker i {
  font-size: 14px;
  color: var(--accent);
}

.mood-sticker span {
  font-size: 0.75rem;
  font-weight: 500;
  color: #dce6ff;
}
</style>
