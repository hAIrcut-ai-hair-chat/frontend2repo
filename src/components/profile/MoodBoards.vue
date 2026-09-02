<template>
    <div class="moodboards-area">
        <div class="filter-row">
            <div class="filter-pills">
                <div v-for="pill in filterPills" :key="pill" class="pill" :class="{ active: activeFilter === pill }"
                    @click="activeFilter = pill">
                    {{ pill }}
                </div>
            </div>
            <div class="sort-btn">
                <i class="ti ti-arrows-sort" aria-hidden="true"></i>
                Mais recentes
            </div>
        </div>

        <div class="moodboards-grid">
            <div v-for="mood in filteredMoods" :key="mood.id" class="mood-card">
                <div class="mood-thumb" :class="mood.ph">
                    <i :class="`ti ${mood.icon}`" aria-hidden="true"></i>
                </div>
                <div class="mood-info">
                    <div class="mood-title">{{ mood.title }}</div>
                    <div class="mood-sub">{{ mood.tags.join(' · ') }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filterPills = ['Todos', 'Cores', 'Tipografia', 'Layout', 'Inspiração']
const activeFilter = ref('Todos')

const moods = ref([
    { id: 1, title: 'Paleta Outono', tags: ['Cores', 'Estação'], ph: 'ph-a', icon: 'ti-palette' },
    { id: 2, title: 'Grids Modernos', tags: ['Layout', 'Web'], ph: 'ph-b', icon: 'ti-layout-grid' },
    { id: 3, title: 'Fontes Serif', tags: ['Tipografia', 'Clássico'], ph: 'ph-c', icon: 'ti-typography' },
    { id: 4, title: 'Minimalismo', tags: ['Inspiração', 'UI'], ph: 'ph-a', icon: 'ti-cube' },
    { id: 5, title: 'Cores Vibrantes', tags: ['Cores', 'Branding'], ph: 'ph-b', icon: 'ti-color-swatch' },
    { id: 6, title: 'Layouts Assimétricos', tags: ['Layout', 'Arte'], ph: 'ph-c', icon: 'ti-layout-sidebar' },
    { id: 7, title: 'Tipografia Display', tags: ['Tipografia', 'Destaque'], ph: 'ph-a', icon: 'ti-letter-case' },
    { id: 8, title: 'Natureza & Formas', tags: ['Inspiração', 'Orgânico'], ph: 'ph-b', icon: 'ti-leaf' },
    { id: 9, title: 'Grids Responsivos', tags: ['Layout', 'Web'], ph: 'ph-c', icon: 'ti-layout-distribute-horizontal' },
])

const filteredMoods = computed(() => {
    if (activeFilter.value === 'Todos') return moods.value
    return moods.value.filter(m => m.tags.includes(activeFilter.value))
})
</script>

<style scoped>
.moodboards-area {
    padding: 24px;
    border-right: 1px solid var(--border);
}

.filter-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.filter-pills {
    display: flex;
    gap: 8px;
}

.pill {
    padding: 5px 14px;
    border-radius: 20px;
    font-size: .78rem;
    font-weight: 500;
    color: var(--txt3);
    border: 1px solid var(--border2);
    cursor: pointer;
    transition: all .15s;
}

.pill.active {
    background: rgba(124, 158, 255, 0.1);
    color: var(--accent);
    border-color: rgba(124, 158, 255, 0.25);
}

.pill:hover:not(.active) {
    color: var(--txt2);
    border-color: var(--border2);
    background: var(--card2);
}

.sort-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: .78rem;
    color: var(--txt3);
    cursor: pointer;
    transition: color .15s;
}

.sort-btn:hover {
    color: var(--txt2);
}

.sort-btn i {
    font-size: 16px;
}

.moodboards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}

.mood-card {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--border);
    background: var(--card2);
    cursor: pointer;
    transition: border-color .2s, transform .15s;
}

.mood-card:hover {
    border-color: var(--border2);
    transform: translateY(-2px);
}

.mood-thumb {
    aspect-ratio: 4/3;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: .2;
    transition: opacity .2s;
}

.mood-card:hover .mood-thumb {
    opacity: .3;
}

.mood-thumb i {
    font-size: 32px;
    color: var(--txt);
}

.ph-a {
    background: linear-gradient(145deg, #0a0a18, #16102e);
}

.ph-b {
    background: linear-gradient(160deg, #080c16, #0d1a2a);
}

.ph-c {
    background: linear-gradient(145deg, #0c100a, #141e10);
}

.mood-info {
    padding: 10px 12px;
}

.mood-title {
    font-size: .82rem;
    font-weight: 500;
    color: var(--txt);
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.mood-sub {
    font-size: .72rem;
    color: var(--txt3);
}
</style>