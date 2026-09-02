<template>
  <div class="editor-topbar">
    <div class="icon-btn" aria-label="Fechar" @click="$emit('close')">
      <i class="ti ti-x" aria-hidden="true"></i>
    </div>
    <div class="top-tools">
      <div class="icon-btn" aria-label="Timer" @click="$emit('cycle-timer')">
        <i class="ti ti-clock" aria-hidden="true"></i>
      </div>
      <div
        class="icon-btn"
        :class="{ 'flash-on': flashOn }"
        aria-label="Flash"
        @click="$emit('toggle-flash')"
      >
        <i class="ti ti-bolt" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  flashOn: { type: Boolean, default: false },
})
defineEmits(['close', 'cycle-timer', 'toggle-flash'])
</script>

<style scoped>
.editor-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 14px 0;
  position: relative;
  z-index: 5;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: background 0.15s;
}

.icon-btn:hover {
  background: rgba(0, 0, 0, 0.5);
}

.icon-btn.flash-on {
  background: rgba(251, 191, 36, 0.3);
}

.icon-btn.flash-on i {
  color: #fbbf24;
}

.icon-btn i {
  font-size: 19px;
  color: #fff;
}

.top-tools {
  display: flex;
  gap: 8px;
}
</style>
