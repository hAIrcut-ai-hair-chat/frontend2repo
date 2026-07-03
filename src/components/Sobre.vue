<template>
    <div class="curtidos-area">
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

        <div class="curtidos-grid">
            <div v-for="item in filteredItems" :key="item.id" class="curtido-card">
                <div class="curtido-thumb" :class="item.ph">
                    <i :class="`ti ${item.icon}`" aria-hidden="true"></i>
                </div>
                <div class="curtido-info">
                    <div class="curtido-title">{{ item.title }}</div>
                    <div class="curtido-sub">{{ item.category }}</div>
                    <div class="curtido-meta">
                        <span><i class="ti ti-heart-filled" aria-hidden="true" style="color:var(--rose);"></i>
                            Curtido</span>
                        <span><i class="ti ti-eye" aria-hidden="true"></i>{{ item.views }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filterPills = ['Todos', 'Design', 'Desenvolvimento', 'Arte', 'Fotografia']
const activeFilter = ref('Todos')

const likedItems = ref([
    { id: 1, title: 'Identidade Visual Studio', category: 'Design · Branding', views: '8.2k', ph: 'ph-a', icon: 'ti-brand-figma' },
    { id: 2, title: 'Paisagens Urbanas', category: 'Fotografia · Preto & Branco', views: '5.7k', ph: 'ph-b', icon: 'ti-camera' },
    { id: 3, title: 'Componentes Vue.js', category: 'Desenvolvimento · Front-end', views: '12.1k', ph: 'ph-c', icon: 'ti-code' },
    { id: 4, title: 'Arte Abstrata', category: 'Arte · Acrílico', views: '3.4k', ph: 'ph-a', icon: 'ti-palette' },
    { id: 5, title: 'Sistemas de Design', category: 'Design · UI', views: '15.6k', ph: 'ph-b', icon: 'ti-layout-dashboard' },
    { id: 6, title: 'Retratos em Aquarela', category: 'Arte · Aquarela', views: '4.9k', ph: 'ph-c', icon: 'ti-brush' },
])

const filteredItems = computed(() => {
    if (activeFilter.value === 'Todos') return likedItems.value
    return likedItems.value.filter(item => item.category.includes(activeFilter.value))
})
</script>

<style scoped>
.curtidos-area {
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

.curtidos-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}

.curtido-card {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--border);
    background: var(--card2);
    cursor: pointer;
    transition: border-color .2s, transform .15s;
}

.curtido-card:hover {
    border-color: var(--border2);
    transform: translateY(-2px);
}

.curtido-thumb {
    aspect-ratio: 4/3;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: .2;
    transition: opacity .2s;
}

.curtido-card:hover .curtido-thumb {
    opacity: .3;
}

.curtido-thumb i {
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

.curtido-info {
    padding: 10px 12px;
}

.curtido-title {
    font-size: .82rem;
    font-weight: 500;
    color: var(--txt);
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.curtido-sub {
    font-size: .72rem;
    color: var(--txt3);
}

.curtido-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
}

.curtido-meta span {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: .72rem;
    color: var(--txt3);
}

.curtido-meta i {
    font-size: 14px;
}
</style>