<template>
  <aside class="sidebar-r">
    <div class="widget-card">
      <div class="widget-title">
        Tendências <a tabindex="0">Ver mais</a>
      </div>
      <div
        v-for="(t, i) in trends"
        :key="t.id"
        class="trend-item"
      >
        <div class="trend-num">{{ i + 1 }}</div>
        <div class="trend-info">
          <div class="trend-name">{{ t.name }}</div>
          <div class="trend-count">{{ t.count }}</div>
        </div>
      </div>
    </div>

    <div class="widget-card">
      <div class="widget-title">
        Sugeridos <a tabindex="0">Ver todos</a>
      </div>
      <div v-for="s in suggestions" :key="s.id" class="suggest-item">
        <img
          v-if="s.avatar"
          :src="s.avatar"
          :alt="s.name"
          class="suggest-avi suggest-avi--img"
        />
        <div
          v-else
          class="suggest-avi suggest-avi--grad"
          :style="{ background: s.gradient }"
        >
          {{ s.initials }}
        </div>
        <div class="suggest-info">
          <div class="suggest-name">{{ s.name }}</div>
          <div class="suggest-sub">{{ s.sub }}</div>
        </div>
        <button class="follow-btn">Seguir</button>
      </div>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  trends: Array,
  suggestions: Array,
})
</script>

<style scoped>
.sidebar-r {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 72px;
  align-self: start;
}

.widget-card {
  background: var(--card);
  border-radius: var(--r);
  border: 1px solid var(--border);
  padding: 16px;
}

.widget-title {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--txt3);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.widget-title a {
  color: var(--accent);
  font-size: 0.7rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
}

.trend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  cursor: pointer;
  border-bottom: 1px solid var(--border);
  transition: opacity 0.15s;
}

.trend-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.trend-item:hover {
  opacity: 0.75;
}

.trend-num {
  width: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--txt3);
  text-align: center;
  flex-shrink: 0;
}

.trend-name {
  font-size: 0.83rem;
  font-weight: 500;
  color: var(--txt);
}

.trend-count {
  font-size: 0.7rem;
  color: var(--txt3);
}

.suggest-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 0;
  cursor: pointer;
}

.suggest-avi {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  flex-shrink: 0;
}

.suggest-avi--img {
  object-fit: cover;
}

.suggest-avi--grad {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
}

.suggest-info {
  flex: 1;
}

.suggest-name {
  font-size: 0.83rem;
  font-weight: 500;
  color: var(--txt);
  line-height: 1.2;
}

.suggest-sub {
  font-size: 0.7rem;
  color: var(--txt3);
}

.follow-btn {
  font-size: 0.72rem;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid var(--border2);
  color: var(--accent);
  background: transparent;
  cursor: pointer;
  font-family: var(--font);
  transition: background 0.15s, color 0.15s;
}

.follow-btn:hover {
  background: rgba(124, 158, 255, 0.12);
  border-color: var(--accent);
}

@media (max-width: 960px) {
  .sidebar-r { display: none; }
}
</style>
