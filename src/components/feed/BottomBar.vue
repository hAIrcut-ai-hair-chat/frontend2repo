<template>
  <div class="bottom-bar">
    <div class="type-pills">
    
    </div>
    <div class="flip-btn" aria-label="Trocar câmera" @click="$emit('flip-camera')">
      <i class="ti ti-camera-rotate" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script setup>
defineProps({
  types: { type: Array, default: () => ['Boomerang', 'Story', 'Reels'] },
  selected: { type: String, default: 'Story' },
})
defineEmits(['select-type', 'flip-camera'])
</script>

<style scoped>
.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  position: relative;
  z-index: 5;
}

.type-pills {
  display: flex;
  gap: 6px;
}

.type-pill {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.18);
  cursor: pointer;
  transition: all 0.15s;
}

.type-pill.active {
  background: #fff;
  color: #0a0a0a;
  border-color: #fff;
}

.flip-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s;
}

.flip-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.flip-btn i {
  font-size: 19px;
  color: #fff;
}
</style>
