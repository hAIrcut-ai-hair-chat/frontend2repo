<template>
  <div class="sfield">
    <label :for="id">{{ label }}</label>
    <div class="sfield-row" :style="multiline ? 'align-items: flex-start; padding-top: 2px; padding-bottom: 2px;' : ''">
      <i v-if="icon" :class="`ti ${icon}`" aria-hidden="true"></i>
      <textarea
        v-if="multiline"
        :id="id"
        :rows="rows"
        :placeholder="placeholder"
        :value="modelValue"
        :maxlength="maxlength"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
      <input
        v-else
        :id="id"
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        autocomplete="off"
      />
      <button
        v-if="isPassword"
        class="eye-btn"
        type="button"
        :aria-label="showPass ? 'Ocultar senha' : 'Mostrar senha'"
        @click="showPass = !showPass"
      >
        <i :class="showPass ? 'ti ti-eye-off' : 'ti ti-eye'"></i>
      </button>
    </div>
    <span v-if="hint" class="sfield-hint">{{ hint }}</span>
    <slot />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: String,
  label: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  icon: String,
  modelValue: String,
  hint: String,
  multiline: Boolean,
  rows: { type: Number, default: 3 },
  maxlength: Number,
})

defineEmits(['update:modelValue'])

const showPass = ref(false)
const isPassword = computed(() => props.type === 'password')
const inputType = computed(() => {
  if (!isPassword.value) return props.type
  return showPass.value ? 'text' : 'password'
})
</script>

<style scoped>
.sfield {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.sfield label {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--txt2);
}

.sfield-row {
  display: flex;
  align-items: center;
  background: var(--card2);
  border: 1px solid var(--border2);
  border-radius: var(--r);
  padding: 0 12px;
  transition: border-color 0.18s;
}

.sfield-row:focus-within {
  border-color: var(--accent);
}

.sfield-row .ti {
  font-size: 18px;
  color: var(--txt3);
  flex-shrink: 0;
  margin-right: 8px;
}

.sfield-row input,
.sfield-row textarea {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--txt);
  font-family: var(--font);
  font-size: 0.875rem;
  font-weight: 300;
  padding: 11px 0;
  resize: none;
  line-height: 1.5;
}

.sfield-row input::placeholder,
.sfield-row textarea::placeholder {
  color: var(--txt3);
}

.sfield-hint {
  font-size: 0.72rem;
  color: var(--txt3);
}

.eye-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--txt3);
  font-size: 18px;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.15s;
}

.eye-btn:hover {
  color: var(--txt2);
}
</style>