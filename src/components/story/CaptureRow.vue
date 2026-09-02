<template>
  <div class="camera-capture">
    <div v-if="cameraActive" class="camera-preview">
      <video ref="video" autoplay playsinline muted></video>
      <button class="close-camera" aria-label="Fechar câmera" @click="closeCamera">
        <i class="ti ti-x"></i>
      </button>
    </div>
    <div v-if="capturedImage" class="captured-preview">
      <img :src="capturedImage" alt="Imagem capturada" />
      <button class="close-camera" aria-label="Fechar imagem" @click="clearImage">
        <i class="ti ti-x"></i>
      </button>
      <button class="retake-btn" @click="retakePhoto">Tirar outra</button>
    </div>
    <input ref="fileInput" type="file" accept="image/*" hidden @change="handleGallery" />
    <div v-if="!capturedImage" class="capture-row">
      <div class="gallery-thumb" aria-label="Abrir galeria" @click="openGallery">
        <i class="ti ti-photo" aria-hidden="true"></i>
      </div>
      <button class="shutter-btn" aria-label="Capturar" @click="handleCapture">
        <div class="shutter-inner"></div>
      </button>
    </div>
    <div v-if="capturedImage" class="captured-actions">
      <button class="confirm-btn" @click="confirmImage">Usar foto</button>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeUnmount } from 'vue'
const emit = defineEmits(['open-gallery', 'capture', 'add-free-text'])
const video = ref(null)
const fileInput = ref(null)
const stream = ref(null)
const cameraActive = ref(false)
const capturedImage = ref(null)
const capturedFile = ref(null)
const openCamera = async () => {
  try {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert('Seu navegador não suporta acesso à câmera.')
      return
    }
    stream.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: false
    })
    cameraActive.value = true
    await new Promise(resolve => setTimeout(resolve, 100))
    if (video.value) {
      video.value.srcObject = stream.value
    }
  } catch (error) {
    console.error('Erro ao acessar a câmera:', error)
    alert('Não foi possível acessar sua câmera. Verifique as permissões do navegador.')
  }
}
const closeCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
    stream.value = null
  }
  if (video.value) {
    video.value.srcObject = null
  }
  cameraActive.value = false
}
const capturePhoto = () => {
  if (!video.value) return
  const canvas = document.createElement('canvas')
  canvas.width = video.value.videoWidth
  canvas.height = video.value.videoHeight
  const context = canvas.getContext('2d')
  context.drawImage(video.value, 0, 0, canvas.width, canvas.height)
  canvas.toBlob(blob => {
    if (!blob) return
    const file = new File([blob], `camera-${Date.now()}.jpg`, { type: 'image/jpeg' })
    capturedFile.value = file
    capturedImage.value = URL.createObjectURL(file)
    closeCamera()
  }, 'image/jpeg', 0.9)
}
const handleCapture = () => {
  if (!cameraActive.value) {
    openCamera()
    return
  }
  capturePhoto()
}
const retakePhoto = () => {
  if (capturedImage.value) {
    URL.revokeObjectURL(capturedImage.value)
  }
  capturedImage.value = null
  capturedFile.value = null
  openCamera()
}
const clearImage = () => {
  if (capturedImage.value) {
    URL.revokeObjectURL(capturedImage.value)
  }
  capturedImage.value = null
  capturedFile.value = null
}
const confirmImage = () => {
  if (!capturedFile.value) return
  emit('capture', capturedFile.value)
}
const openGallery = () => {
  fileInput.value?.click()
  emit('open-gallery')
}
const handleGallery = event => {
  const file = event.target.files?.[0]
  if (!file) return
  if (capturedImage.value) {
    URL.revokeObjectURL(capturedImage.value)
  }
  capturedFile.value = file
  capturedImage.value = URL.createObjectURL(file)
  event.target.value = ''
}
const addFreeText = () => {
  emit('add-free-text')
}
onBeforeUnmount(() => {
  closeCamera()
  if (capturedImage.value) {
    URL.revokeObjectURL(capturedImage.value)
  }
})
</script>
<style scoped>
.camera-capture {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #000;
  z-index: 9999;
}
.camera-preview {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #000;
}
.camera-preview video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.captured-preview {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #000;
}
.captured-preview img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.close-camera {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10001;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}
.close-camera:hover {
  background: rgba(0, 0, 0, 0.8);
}
.close-camera:active {
  transform: scale(0.9);
}
.close-camera i {
  font-size: 22px;
}
.capture-row {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10000;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  padding: 20px 14px 32px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
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
  transition: border-color 0.15s, transform 0.1s;
}
.gallery-thumb:hover {
  border-color: rgba(255, 255, 255, 0.4);
}
.gallery-thumb:active {
  transform: scale(0.92);
}
.gallery-thumb i {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
}
.shutter-btn {
  width: 66px;
  height: 66px;
  padding: 0;
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
.retake-btn {
  position: fixed;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%);
  z-index: 10002;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.retake-btn:active {
  transform: translateX(-50%) scale(0.95);
}
.captured-actions {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10000;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 20px 32px;
  box-sizing: border-box;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}
.confirm-btn {
  padding: 12px 30px;
  border: none;
  border-radius: 24px;
  background: #fff;
  color: #000;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s;
}
.confirm-btn:active {
  transform: scale(0.95);
}
</style>

