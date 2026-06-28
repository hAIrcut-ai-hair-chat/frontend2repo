<template>
  <nav class="sidebar">
    <div
      v-for="item in navItems"
      :key="item.label"
      class="nav-item"
      :class="{ active: item.active }"
      @click="setActive(item)"
    >
      <i :class="`ti ${item.icon}`"></i>
      {{ item.label }}
      <span v-if="item.badge" class="badge">{{ item.badge }}</span>
    </div>

    <div class="nav-section">Coleções</div>

    <div
      v-for="col in collections"
      :key="col.label"
      class="nav-item"
      :class="{ active: col.active }"
      @click="setActive(col)"
    >
      <i :class="`ti ${col.icon}`"></i>
      {{ col.label }}
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const navItems = ref([
  { label: 'Início', icon: 'ti-home', active: true, badge: null },
  { label: 'Explorar', icon: 'ti-compass', active: false, badge: null },
  { label: 'Notificações', icon: 'ti-bell', active: false, badge: 4 },
  { label: 'Mensagens', icon: 'ti-message-2', active: false, badge: null },
  { label: 'Salvos', icon: 'ti-bookmark', active: false, badge: null },
  { label: 'Perfil', icon: 'ti-user', active: false, badge: null },
])

const collections = ref([
  { label: 'Design', icon: 'ti-palette', active: false },
  { label: 'Dev', icon: 'ti-code', active: false },
  { label: 'Fotografia', icon: 'ti-photo', active: false },
])

function setActive(clicked) {
  navItems.value.forEach(i => (i.active = false))
  collections.value.forEach(i => (i.active = false))
  clicked.active = true
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: sticky;
  top: 72px;
  align-self: start;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  color: var(--txt2);
  font-size: 0.88rem;
  transition: background 0.15s, color 0.15s;
}

.nav-item:hover {
  background: var(--card2);
  color: var(--txt);
}

.nav-item.active {
  background: var(--card);
  color: var(--txt);
}

.nav-item .ti {
  font-size: 20px;
}

.badge {
  margin-left: auto;
  background: var(--accent);
  color: #04122e;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 20px;
}

.nav-section {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--txt3);
  text-transform: uppercase;
  padding: 16px 12px 6px;
}

@media (max-width: 960px) {
  .sidebar { display: none; }
}
</style>
