<template>
  <div class="tools-rail">
    <div class="tool-icon" aria-label="Adicionar texto" @click="$emit('cycle-text-style')">
      <i class="ti ti-typography" aria-hidden="true"></i>
    </div>
    <div class="tool-icon" aria-label="Adicionar sticker" @click="$emit('toggle-location')">
      <i class="ti ti-mood-smile" aria-hidden="true"></i>
    </div>
    <div class="tool-icon" aria-label="Desenhar" @click="$emit('draw')">
      <i class="ti ti-pencil" aria-hidden="true"></i>
    </div>
    <div class="tool-icon" aria-label="Adicionar música" @click="$emit('toggle-music')">
      <i class="ti ti-music" aria-hidden="true"></i>
    </div>
    <div class="tool-icon" aria-label="Adicionar link" @click="$emit('add-link')">
      <i class="ti ti-link" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script setup>
defineEmits(['cycle-text-style', 'toggle-location', 'draw', 'toggle-music', 'add-link'])
</script>

<style scoped>
.tools-rail {
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: absolute;
  right: 14px;
  top: 70px;
  z-index: 5;
}

.tool-icon {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s;
}

.tool-icon:hover {
  background: rgba(0, 0, 0, 0.5);
}

.tool-icon i {
  font-size: 17px;
  color: #fff;
}
</style>
