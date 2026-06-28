<template>
  <div class="compose">
    <div class="avatar-sm">JD</div>
    <input
      type="text"
      v-model="text"
      placeholder="No que você está pensando?"
    />
    <div class="compose-actions">
      <i class="ti ti-photo compose-icon"></i>
      <i class="ti ti-mood-smile compose-icon"></i>
      <button class="post-btn" @click="publish">Publicar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['publish'])
const text = ref('')

function publish() {
  if (!text.value.trim()) return
  emit('publish', text.value.trim())
  text.value = ''
}
</script>

<style scoped>
.compose {
  background: var(--card);
  border-radius: var(--r);
  border: 1px solid var(--border);
  padding: 14px 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  transition: border-color 0.2s;
}

.compose:focus-within {
  border-color: var(--border2);
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

.compose input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--txt);
  font-family: var(--font);
  font-size: 0.88rem;
  font-weight: 300;
}

.compose input::placeholder {
  color: var(--txt3);
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
}

.post-btn:hover {
  opacity: 0.88;
}

.post-btn:active {
  transform: scale(0.97);
}
</style>
