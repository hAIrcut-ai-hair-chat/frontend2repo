<template>
  <div class="compose">
    <div class="compose-row">
      <div class="avatar-sm">JD</div>

      <input
        type="text"
        v-model="text"
        placeholder="Faça uma postagem aqui..."
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
          :class="{ active: showEmoji }"
          @click="toggleEmoji"
        ></i>

        <i
          class="ti ti-photo compose-icon"
          @click="openImagePicker"
        ></i>

        <div v-if="imagePreview" class="image-preview-thumb">
          <img :src="imagePreview" alt="Prévia" />

          <button
            type="button"
            class="remove-image-thumb"
            @click="removeImage"
          >
            <i class="ti ti-x"></i>
          </button>
        </div>

        <button
          class="post-btn"
          @click="publish"
          :disabled="isLoading || (!text.trim() && !image)"
        >
          <span v-if="isLoading">Publicando...</span>
          <span v-else>Publicar</span>
        </button>
      </div>
    </div>

    <div v-if="showEmoji" class="emoji-picker">
      <emoji-picker @emoji-click="addEmoji"></emoji-picker>
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useFeedStore } from "@/stores/postSocket";
import { useUploaderStore } from "@/stores/uploader";

const feedStore = useFeedStore();
const uploaderStore = useUploaderStore();

const text = ref("");
const showEmoji = ref(false);

const imageInput = ref(null);
const image = ref(null);
const imagePreview = ref(null);

const isLoading = ref(false);
const errorMessage = ref("");

watch(
  () => feedStore.error,
  (newErr) => {
    if (newErr) {
      errorMessage.value = newErr;
      feedStore.clearError();
    }
  }
);

function toggleEmoji() {
  showEmoji.value = !showEmoji.value;
}

function addEmoji(event) {
  text.value += event.detail.unicode;
}

function openImagePicker() {
  imageInput.value?.click();
}

function handleImage(event) {
  const file = event.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    errorMessage.value = "Selecione uma imagem válida.";
    return;
  }

  image.value = file;
  imagePreview.value = URL.createObjectURL(file);
  errorMessage.value = "";
}

function removeImage() {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value);
  }

  image.value = null;
  imagePreview.value = null;

  if (imageInput.value) {
    imageInput.value.value = "";
  }
}

async function publish() {
  if (!text.value.trim() && !image.value) {
    errorMessage.value = "Escreva algo ou escolha uma imagem.";
    return;
  }

  if (isLoading.value) return;

  if (!feedStore.connected) {
    errorMessage.value = "Sem conexão com o servidor.";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    let imageKey = null;

    if (image.value) {
      const uploadedImage = await uploaderStore.addUploader(image.value);

      if (!uploadedImage) {
        throw new Error(
          uploaderStore.error || "Erro ao fazer upload da imagem."
        );
      }

      imageKey = uploadedImage.attachment_key;
    }

    const sent = feedStore.send({
      text: text.value.trim() || null,
      image: imageKey
    });

    if (!sent) {
      throw new Error("Falha ao enviar a postagem.");
    }

    text.value = "";
    removeImage();
    showEmoji.value = false;
  } catch (error) {
    console.error("Erro ao publicar:", error);

    errorMessage.value =
      error.message ||
      uploaderStore.error ||
      feedStore.error ||
      "Erro ao publicar.";
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
  transition: border-color .2s;
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
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
}

.compose input[type="text"] {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--txt);
  font-family: var(--font);
  font-size: .9rem;
}

.compose input[type="text"]::placeholder {
  color: var(--txt3);
}

.compose-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.compose-icon {
  font-size: 20px;
  color: var(--txt3);
  cursor: pointer;
  transition: .2s;
}

.compose-icon:hover {
  color: var(--txt);
}

.compose-icon.active {
  color: var(--accent);
}

.image-preview-thumb {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.image-preview-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image-thumb {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: rgba(0,0,0,.8);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-btn {
  border: none;
  border-radius: 20px;
  padding: 6px 16px;
  background: var(--accent);
  color: #03122e;
  cursor: pointer;
  font-weight: 600;
  transition: .2s;
}

.post-btn:hover:not(:disabled) {
  opacity: .9;
}

.post-btn:disabled {
  opacity: .5;
  cursor: not-allowed;
}

.emoji-picker {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 9999;
}

.error-message {
  color: #ff6b6b;
  font-size: .8rem;
}
</style>