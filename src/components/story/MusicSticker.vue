<template>
  <div class="sticker-tag" @click="$emit('click')">
    <i class="ti ti-music" aria-hidden="true"></i>
    <span>{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, default: '' },
})
defineEmits(['click'])
</script>

<style scoped>
.sticker-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
  padding: 7px 14px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
  position: relative;
  z-index: 2;
  cursor: pointer;
}

.sticker-tag i {
  font-size: 15px;
  color: var(--accent);
}

.sticker-tag span {
  font-size: 0.82rem;
  font-weight: 500;
  color: #fff;
}
</style>
