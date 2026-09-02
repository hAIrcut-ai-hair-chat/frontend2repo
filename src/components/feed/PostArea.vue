<!-- PostsArea.vue -->
<template>
    <div class="posts-area">
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

        <div class="posts-grid">
            <div v-for="post in filteredPosts" :key="post.id" class="post-card">
                <div class="post-thumb" :class="post.ph">
                    <i :class="`ti ${post.icon}`" aria-hidden="true"></i>
                </div>
                <div class="post-info">
                    <div class="post-title">{{ post.title }}</div>
                    <div class="post-sub">{{ post.category }}</div>
                    <div class="post-meta">
                        <span><i class="ti ti-heart" aria-hidden="true"></i>{{ post.likes }}</span>
                        <span><i class="ti ti-eye" aria-hidden="true"></i>{{ post.views }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    posts: Array,
    activeTab: String,
})

const filterPills = ['Todos', 'UI Design', 'Web', 'Mobile', 'Branding']
const activeFilter = ref('Todos')

const filteredPosts = computed(() => {
    if (activeFilter.value === 'Todos') return props.posts
    return props.posts.filter(p => p.category.includes(activeFilter.value))
})
</script>

<style scoped>
.posts-area {
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

.posts-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}

.post-card {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--border);
    background: var(--card2);
    cursor: pointer;
    transition: border-color .2s, transform .15s;
}

.post-card:hover {
    border-color: var(--border2);
    transform: translateY(-2px);
}

.post-thumb {
    aspect-ratio: 4/3;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: .2;
    transition: opacity .2s;
}

.post-card:hover .post-thumb {
    opacity: .3;
}

.post-thumb i {
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

.post-info {
    padding: 10px 12px;
}

.post-title {
    font-size: .82rem;
    font-weight: 500;
    color: var(--txt);
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.post-sub {
    font-size: .72rem;
    color: var(--txt3);
}

.post-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
}

.post-meta span {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: .72rem;
    color: var(--txt3);
}

.post-meta i {
    font-size: 14px;
}
</style>