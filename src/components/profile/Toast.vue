<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  message: { type: String, default: 'Alterações salvas com sucesso.' },
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])
const visible = ref(false)

watch(() => props.modelValue, (val) => {
  if (val) {
    visible.value = true
    setTimeout(() => {
      visible.value = false
      emit('update:modelValue', false)
    }, 3000)
  }
})
</script>

<template>
  <Transition name="toast">
    <div v-if="visible" class="toast">
      <i class="ti ti-circle-check" aria-hidden="true"></i>
      {{ message }}
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  background: var(--card2);
  border: 1px solid var(--success-border);
  border-radius: 12px;
  font-size: 0.83rem;
  color: var(--success);
  z-index: 100;
  pointer-events: none;
}

.toast .ti {
  font-size: 18px;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>