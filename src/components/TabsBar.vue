<!-- TabsBar.vue -->
<template>
    <div class="tabs-bar">
        <div v-for="tab in tabs" :key="tab" class="tab" :class="{ active: modelValue === tab }"
            @click="$emit('update:modelValue', tab)">
            {{ tab }}
            <span v-if="tab === 'Work'" class="tab-count">48</span>
        </div>
        <div class="tab-settings">
            <i class="ti ti-settings" aria-hidden="true"></i>
            Editar perfil
        </div>
    </div>
</template>

<script setup>
defineProps({
    tabs: Array,
    modelValue: String,
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.tabs-bar {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border);
    padding: 0 40px;
    gap: 4px;
    background: var(--card);
}

.tab {
    padding: 13px 16px;
    font-size: .85rem;
    font-weight: 500;
    color: var(--txt3);
    cursor: pointer;
    position: relative;
    transition: color .15s;
    display: flex;
    align-items: center;
    gap: 6px;
}

.tab.active {
    color: var(--txt);
}

.tab.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 8px;
    right: 8px;
    height: 2px;
    background: var(--accent);
    border-radius: 2px 2px 0 0;
}

.tab:hover:not(.active) {
    color: var(--txt2);
}

.tab-count {
    font-size: .7rem;
    font-weight: 600;
    padding: 1px 7px;
    border-radius: 20px;
    background: var(--card2);
    color: var(--txt3);
}

.tab.active .tab-count {
    background: rgba(124, 158, 255, 0.12);
    color: var(--accent);
}

.tab-settings {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid var(--border2);
    color: var(--txt2);
    font-size: .8rem;
    font-weight: 500;
    cursor: pointer;
    transition: background .15s, color .15s;
}

.tab-settings:hover {
    background: var(--card2);
    color: var(--txt);
}

.tab-settings i {
    font-size: 16px;
}
</style>