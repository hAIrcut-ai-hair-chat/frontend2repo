<template>
  <div
    class="sticker-text"
    contenteditable="true"
    @input="onInput"
  >{{ modelValue }}</div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])

function onInput(e) {
  emit('update:modelValue', e.target.innerText)
}
</script>

<style scoped>
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
</style>
