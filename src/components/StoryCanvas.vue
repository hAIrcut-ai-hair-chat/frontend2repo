<template>
  <div class="canvas-content">
    <div class="canvas-dots"></div>

    <LocationSticker
      v-if="showLocation"
      :location="location"
      @click="$emit('toggle-location')"
    />

    <EditableStoryText :model-value="text" @update:modelValue="$emit('update:text', $event)" />

    <MusicSticker
      v-if="showMusic"
      :label="musicLabel"
      @click="$emit('toggle-music')"
    />

    <ToolsRail
      @cycle-text-style="$emit('cycle-text-style')"
      @toggle-location="$emit('toggle-location')"
      @draw="$emit('draw')"
      @toggle-music="$emit('toggle-music')"
      @add-link="$emit('add-link')"
    />
  </div>
</template>

<script setup>
import LocationSticker from './LocationSticker.vue'
import MusicSticker from './MusicSticker.vue'
import EditableStoryText from './EditableStoryText.vue'
import ToolsRail from './ToolsRail.vue'

defineProps({
  text: { type: String, default: '' },
  showLocation: { type: Boolean, default: true },
  location: { type: String, default: '' },
  showMusic: { type: Boolean, default: true },
  musicLabel: { type: String, default: '' },
})

defineEmits([
  'update:text',
  'toggle-location',
  'toggle-music',
  'cycle-text-style',
  'draw',
  'add-link',
])
</script>

<style scoped>
.canvas-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px;
}

.canvas-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 22px 22px;
}
</style>
