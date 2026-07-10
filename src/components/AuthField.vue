<template>
  <div class="auth-field" :class="{ 'has-error': hasError }">
    <label :for="id" class="field-label">{{ label }}</label>

    <div class="input-wrap">
      <i v-if="icon" class="ti" :class="icon" aria-hidden="true"></i>

      <input
        :id="id"
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue($event)"
        @blur="onBlur"
        class="field-input"
      />

      <button
        v-if="type === 'password'"
        type="button"
        class="toggle-password"
        @click="showPassword = !showPassword"
      >
        <i
          class="ti"
          :class="showPassword ? 'ti-eye' : 'ti-eye-off'"
        ></i>
      </button>
    </div>

    <p v-if="hasError" class="field-error">{{ errorMsg }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  icon: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
  hasError: { type: Boolean, default: false },
  errorMsg: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'blur'])

const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type !== 'password') return props.type
  return showPassword.value ? 'text' : 'password'
})

function updateValue(event) {
  emit('update:modelValue', event.target.value)
}

function onBlur(event) {
  emit('blur', event)
}
</script>

<style scoped>
.auth-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: #c0c0d0;
  letter-spacing: -0.2px;
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrap > .ti:first-child {
  position: absolute;
  left: 12px;
  font-size: 18px;
  color: #aaaac0;
  pointer-events: none;
  transition: color .2s;
}

.field-input {
  width: 100%;
  padding: 10px 44px 10px 40px;
  border-radius: var(--r, 10px);
  border: 1px solid var(--border2, #2a2a3a);
  background: #1e1e2f;
  color: #f0f0f5;
  font-family: var(--font, inherit);
  font-size: .875rem;
  transition: border-color .15s, box-shadow .15s;
  outline: none;
  box-sizing: border-box;
}

.field-input::placeholder {
  color: #8888aa;
  opacity: .7;
}

.field-input:focus {
  border-color: var(--accent, #6c8cff);
  box-shadow: 0 0 0 3px rgba(108,140,255,.2);
}

.input-wrap:focus-within > .ti:first-child {
  color: var(--accent, #6c8cff);
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  color: #aaaac0;
  transition: color .2s;
}

.toggle-password:hover {
  color: var(--accent, #6c8cff);
}

.toggle-password .ti {
  font-size: 18px;
}

.has-error .field-input {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231,76,60,.15);
  background: #1e1e2f;
}

.field-error {
  font-size: .75rem;
  color: #ff6b6b;
  margin-top: 2px;
  padding-left: 2px;
}
</style>