<template>
  <div class="search-bar">
    <i class="ti ti-search" aria-hidden="true"></i>
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <button v-if="modelValue" class="search-clear" @click="$emit('update:modelValue', '')">
      <i class="ti ti-x" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Pesquisar...'
  }
})

defineEmits(['update:modelValue'])

const isFocused = ref(false)
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--card2);
  border: 1px solid var(--border2);
  border-radius: 20px;
  padding: 4px 14px;
  transition: border-color .15s;
  width: 220px;
}
.search-bar:focus-within {
  border-color: var(--accent);
}

.search-bar i {
  color: var(--txt3);
  font-size: 16px;
}

.search-bar input {
  background: transparent;
  border: none;
  outline: none;
  color: var(--txt);
  font-family: var(--font);
  font-size: .85rem;
  padding: 6px 0;
  width: 100%;
}
.search-bar input::placeholder {
  color: var(--txt3);
}

.search-clear {
  background: none;
  border: none;
  color: var(--txt3);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background .15s;
}
.search-clear:hover {
  background: var(--border);
}
.search-clear i {
  font-size: 14px;
  color: var(--txt3);
}
</style>