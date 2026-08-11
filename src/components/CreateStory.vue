<template>
  <div class="phone">
    <div class="editor-canvas">

      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>

      <div class="editor-topbar">
        <div class="icon-btn" aria-label="Fechar" @click="$emit('close')">
          <i class="ti ti-x" aria-hidden="true"></i>
        </div>
        <div class="top-tools">
          <div class="icon-btn" aria-label="Timer" @click="cycleTimer">
            <i class="ti ti-clock" aria-hidden="true"></i>
          </div>
          <div
            class="icon-btn"
            :class="{ 'flash-on': flashOn }"
            aria-label="Flash"
            @click="flashOn = !flashOn"
          >
            <i class="ti ti-bolt" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      <div class="canvas-content">
        <div class="canvas-dots"></div>

        <div class="mood-sticker" v-if="showLocation">
          <i class="ti ti-map-pin" aria-hidden="true"></i>
          <span>{{ location }}</span>
        </div>

        <div
          class="sticker-text"
          contenteditable="true"
          @input="onTextInput"
        >{{ storyText }}</div>

        <div class="sticker-tag" v-if="showMusic">
          <i class="ti ti-music" aria-hidden="true"></i>
          <span>{{ musicLabel }}</span>
        </div>

        <div class="tools-rail">
          <div class="tool-icon" aria-label="Adicionar texto" @click="cycleTextStyle">
            <i class="ti ti-typography" aria-hidden="true"></i>
          </div>
          <div class="tool-icon" aria-label="Adicionar sticker" @click="showLocation = !showLocation">
            <i class="ti ti-mood-smile" aria-hidden="true"></i>
          </div>
          <div class="tool-icon" aria-label="Desenhar">
            <i class="ti ti-pencil" aria-hidden="true"></i>
          </div>
          <div class="tool-icon" aria-label="Adicionar música" @click="showMusic = !showMusic">
            <i class="ti ti-music" aria-hidden="true"></i>
          </div>
          <div class="tool-icon" aria-label="Adicionar link">
            <i class="ti ti-link" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      <div class="bottom-bar">
        <div class="type-pills">
          <div
            v-for="type in contentTypes"
            :key="type"
            class="type-pill"
            :class="{ active: selectedType === type }"
            @click="selectedType = type"
          >
            {{ type }}
          </div>
        </div>
        <div class="flip-btn" aria-label="Trocar câmera" @click="flipCamera">
          <i class="ti ti-camera-rotate" aria-hidden="true"></i>
        </div>
      </div>

      <div class="capture-row">
        <div class="gallery-thumb" aria-label="Abrir galeria" @click="$emit('open-gallery')">
          <i class="ti ti-photo" aria-hidden="true"></i>
        </div>
        <button class="shutter-btn" aria-label="Capturar" @click="capture">
          <div class="shutter-inner"></div>
        </button>
        <div class="gallery-thumb" aria-label="Adicionar texto livre" @click="addFreeText">
          <i class="ti ti-plus" aria-hidden="true"></i>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['close', 'discard', 'open-gallery', 'share'])

const progress = ref(38)
const flashOn = ref(false)
const timerOptions = [0, 3, 10]
const timerIndex = ref(0)

const storyText = ref('ManoPotas esteve aqui')
const showLocation = ref(true)
const location = ref('Joinville, SC')
const showMusic = ref(true)
const musicLabel = ref('Sunday Morning · Nova')

const contentTypes = ['Boomerang', 'Story', 'Reels']
const selectedType = ref('Story')

const userName = ref('João Dasilva')
const userInitials = computed(() => {
  const parts = userName.value.split(' ')
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
})

function cycleTimer() {
  timerIndex.value = (timerIndex.value + 1) % timerOptions.length
}

function onTextInput(e) {
  storyText.value = e.target.innerText
}

function cycleTextStyle() {
  // placeholder para alternância de estilo de texto
}

function flipCamera() {
  // placeholder para troca de câmera frontal/traseira
}

function capture() {
  // placeholder para captura de foto/vídeo
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

.sticker-text {
  font-size: 1.6rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
  letter-spacing: -0.3px;
  padding: 10px 18px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.15);
  cursor: text;
  position: relative;
  z-index: 2;
  outline: none;
  max-width: 260px;
}

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

.capture-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  padding: 6px 14px 22px;
}

.gallery-thumb {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: linear-gradient(135deg, #0d1428, #1a0e2e);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.15s;
}

.gallery-thumb:hover {
  border-color: rgba(255, 255, 255, 0.4);
}

.gallery-thumb i {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
}

.shutter-btn {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  border: 3.5px solid #fff;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.1s;
}

.shutter-btn:active {
  transform: scale(0.92);
}

.shutter-inner {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #fff;
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

.share-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px;
  background: #000;
}

.share-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.15);
}

.share-btn-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  border: none;
  color: #03122e;
  font-family: var(--font);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
}

.share-btn-main:hover {
  opacity: 0.88;
}

.share-btn-main i {
  font-size: 17px;
}

.close-share {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s;
}

.close-share:hover {
  background: rgba(248, 113, 113, 0.2);
}

.close-share i {
  font-size: 18px;
  color: #fff;
}
</style>