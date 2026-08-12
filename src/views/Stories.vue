<script setup>
import { ref } from 'vue'
import ProgressBar from '@/components/ProgressBar.vue'
import EditorTopBar from '@/components/EditorTopBar.vue'
import StoryCanvas from '@/components/StoryCanvas.vue'
import BottomBar from '@/components/BottomBar.vue'
import CaptureRow from '@/components/CaptureRow.vue'
import { useStoriesStore } from '@/stores/stories'

const emit = defineEmits(['close', 'discard', 'open-gallery', 'share'])

const storiesStore = useStoriesStore()

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

const selectedImage = ref(null)

function cycleTimer() {
  timerIndex.value =
    (timerIndex.value + 1) % timerOptions.length
}

function cycleTextStyle() {}

function onDraw() {}

function onAddLink() {}

function flipCamera() {}

function addFreeText() {
  storyText.value += ' '
}

function setImage(file) {
  selectedImage.value = file
}

async function shareStory() {
  try {
    const story = await storiesStore.addStory(
      storyText.value,
      selectedImage.value
    )

    emit('share', story)

    selectedImage.value = null
  } catch (error) {
    console.error('Erro ao publicar story:', error)
  }
}

function openGallery() {
  emit('open-gallery')
}

defineExpose({
  shareStory,
  setImage
})
</script>

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
        :types="['Story']"
        :selected="selectedType"
        @select-type="selectedType = $event"
        @flip-camera="flipCamera"
      />

      <CaptureRow
        @open-gallery="openGallery"
        @capture="shareStory"
        @add-free-text="addFreeText"
      />

      <div v-if="storiesStore.loading" class="story-loading">
        Publicando story...
      </div>

      <div v-if="storiesStore.hasError" class="story-error">
        {{ storiesStore.error }}
      </div>

    </div>
  </div>
</template>

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