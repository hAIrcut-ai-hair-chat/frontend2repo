<template>
  <div class="stories">
    <div class="story add-story">
      <div class="story-ring">
        <div class="story-ring-inner story-ring-inner--add">
          <i class="ti ti-plus"></i>
        </div>
      </div>
      <span>Adicionar</span>
    </div>

    <div
      v-for="s in stories"
      :key="s.id"
      class="story"
    >
      <div class="story-ring">
        <div class="story-ring-inner">
          <img :src="s.avatar" :alt="`Story de ${s.name}`" />
        </div>
      </div>
      <span>{{ s.name }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({ stories: Array })
</script>

<style scoped>
.stories {
  display: flex;
  gap: 14px;
  padding: 16px 18px;
  background: var(--card);
  border-radius: var(--r);
  border: 1px solid var(--border);
  overflow-x: auto;
  scrollbar-width: none;
  margin-bottom: 20px;
}

.stories::-webkit-scrollbar {
  display: none;
}

.story {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  cursor: pointer;
}

.story-ring {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: conic-gradient(var(--accent), var(--accent2), var(--rose), var(--accent));
  padding: 2px;
  transition: transform 0.15s;
}

.story:hover .story-ring {
  transform: scale(1.08);
}

.story-ring-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--bg);
  padding: 2px;
}

.story-ring-inner img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.add-story .story-ring {
  background: var(--card2);
  border: 1.5px dashed var(--border2);
}

.story-ring-inner--add {
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.story-ring-inner--add .ti {
  color: var(--txt2);
  font-size: 22px;
}

.story span {
  font-size: 0.68rem;
  color: var(--txt2);
  max-width: 56px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
</style>
