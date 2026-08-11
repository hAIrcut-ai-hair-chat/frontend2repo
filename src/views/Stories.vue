<template>
  <div class="phone">
    <div class="editor-canvas">

      <ProgressBar :value="progress" />

      <EditorTopBar
        :flash-on="flashOn"
        @close="$emit('close')"
        @cycle-timer="cycleTimer"
        @toggle-flash="flashOn = !flashOn"
      />

      <StoryCanvas
        :text="storyText"
        :show-location="showLocation"
        :location="location"
        :show-music="showMusic"
        :music-label="musicLabel"
        @update:text="storyText = $event"
        @toggle-location="showLocation = !showLocation"
        @toggle-music="showMusic = !showMusic"
        @cycle-text-style="cycleTextStyle"
        @draw="onDraw"
        @add-link="onAddLink"
      />

      <BottomBar
        :types="contentTypes"
        :selected="selectedType"
        @select-type="selectedType = $event"
        @flip-camera="flipCamera"
      />

      <CaptureRow
        @open-gallery="$emit('open-gallery')"
        @capture="capture"
        @add-free-text="addFreeText"
      />

    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import ProgressBar from '@/components/ProgressBar.vue'
import EditorTopBar from '@/components/EditorTopBar.vue'
import StoryCanvas from '@/components/StoryCanvas.vue'
import BottomBar from '@/components/BottomBar.vue'
import CaptureRow from '@/components/CaptureRow.vue'

const emit = defineEmits(['close', 'discard', 'open-gallery', 'share'])

const progress = ref(38)
const flashOn = ref(false)
const timerOptions = [0, 3, 10]
const timerIndex = ref(0)

const storyText = ref('Bom dia ✨')
const showLocation = ref(true)
const location = ref('Joinville, SC')
const showMusic = ref(true)
const musicLabel = ref('Sunday Morning · Nova')

    const selectedType = ref('Story')


function cycleTimer() {
  timerIndex.value = (timerIndex.value + 1) % timerOptions.length
}

function cycleTextStyle() {
  // placeholder para alternância de estilo de texto
}

function onDraw() {
  // placeholder para modo de desenho
}

function onAddLink() {
  // placeholder para adicionar link
}

function flipCamera() {
  // placeholder para troca de câmera frontal/traseira
}



function addFreeText() {
  storyText.value = storyText.value + ' '
}

function shareStory() {
  emit('share', {
    text: storyText.value,
    type: selectedType.value,
    location: showLocation.value ? location.value : null,
    music: showMusic.value ? musicLabel.value : null,
  })
}

defineExpose({ shareStory })
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

<style scoped>
.phone {
  width: 100vw;
  height: 100vh;
  background: #000;
  border-radius: 0;
  border: none;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.editor-canvas {
  position: relative;
  flex: 1;
  background: linear-gradient(160deg, #1a0e2e 0%, #0d1428 45%, #0a1c1a 100%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>