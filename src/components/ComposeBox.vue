<template>
  <div class="compose">
    <div class="compose-row">
      <div class="avatar-sm">JD</div>

      <input
        type="text"
        v-model="text"
        placeholder="No que você está pensando?"
        @keydown.enter.prevent="publish"
        :disabled="isLoading"
      />

      <input
        ref="imageInput"
        type="file"
        accept="image/*"
        hidden
        @change="handleImage"
      />

      <div class="compose-actions">
        <i
          class="ti ti-mood-smile compose-icon"
          @click="toggleEmoji"
          :class="{ active: showEmoji }"
        ></i>

        <i
          class="ti ti-photo compose-icon"
          @click="openImagePicker"
        ></i>

        <div v-if="imagePreview" class="image-preview-thumb">
          <img :src="imagePreview" alt="Prévia" />
          <button class="remove-image-thumb" @click="removeImage" type="button">
            <i class="ti ti-x"></i>
          </button>
        </div>

        <button
          class="post-btn"
          @click="publish"
          :disabled="isLoading || (!text.trim() && !image)"
        >
          <span v-if="isLoading">Publicando…</span>
          <span v-else>Publicar</span>
        </button>
      </div>
    </div>

    <div v-if="showEmoji" class="emoji-picker" @click.stop>
      <emoji-picker @emoji-click="addEmoji" />
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useThinkStore } from "@/stores/think";

const thinkStore = useThinkStore();

const text = ref("");
const showEmoji = ref(false);
const imageInput = ref(null);
const image = ref(null);
const imagePreview = ref(null);
const isLoading = ref(false);
const errorMessage = ref("");

function toggleEmoji() {
  showEmoji.value = !showEmoji.value;
}

function addEmoji(event) {
  text.value += event.detail.unicode;
}

function openImagePicker() {
  imageInput.value.click();
}

function handleImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    errorMessage.value = "Por favor, selecione uma imagem válida.";
    return;
  }

  image.value = file;
  imagePreview.value = URL.createObjectURL(file);
  errorMessage.value = "";
}

function removeImage() {
  image.value = null;
  imagePreview.value = null;
  if (imageInput.value) {
    imageInput.value.value = "";
  }
}

async function publish() {
  const hasText = text.value.trim().length > 0;
  const hasImage = !!image.value;

  if (!hasText && !hasImage) {
    errorMessage.value = "Escreva algo ou adicione uma imagem.";
    return;
  }

  if (isLoading.value) return;

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const formData = new FormData();
    formData.append("text", text.value.trim());
    if (image.value) {
      formData.append("image", image.value);
    }

    await thinkStore.addThink(formData);

    text.value = "";
    showEmoji.value = false;
    removeImage();
  } catch (error) {
    console.error("Erro ao publicar:", error);
    errorMessage.value = "Não foi possível publicar. Tente novamente.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.compose {
  background: var(--card);
  border-radius: var(--r);
  border: 1px solid var(--border);
  padding: 14px 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
  transition: border-color 0.2s;
  position: relative;
}

.compose:focus-within {
  border-color: var(--border2);
}

.compose-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.avatar-sm {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  flex-shrink: 0;
}

.compose input[type="text"] {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--txt);
  font-family: var(--font);
  font-size: 0.88rem;
  font-weight: 300;
}

.compose input[type="text"]::placeholder {
  color: var(--txt3);
}

.compose input[type="text"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.compose-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.compose-icon {
  color: var(--txt3);
  font-size: 20px;
  cursor: pointer;
  transition: color 0.15s;
}

.compose-icon:hover {
  color: var(--txt2);
}

.compose-icon.active {
  color: var(--accent);
}

.image-preview-thumb {
  position: relative;
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.image-preview-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.remove-image-thumb {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  padding: 0;
  transition: background 0.15s;
}

.remove-image-thumb:hover {
  background: rgba(0, 0, 0, 0.95);
}

.remove-image-thumb i {
  font-size: 12px;
}

.post-btn {
  padding: 6px 16px;
  border-radius: 20px;
  background: var(--accent);
  border: none;
  color: #03122e;
  font-family: var(--font);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.1s;
  white-space: nowrap;
}

.post-btn:hover:not(:disabled) {
  opacity: 0.88;
}

.post-btn:active:not(:disabled) {
  transform: scale(0.97);
}

.post-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.emoji-picker {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.8rem;
  padding: 4px 0 0 0;
  font-weight: 400;
}
</style>