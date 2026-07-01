<script setup>
import { ref, computed } from 'vue'

const user = ref({
  name: 'João Dasilva',
  handle: 'joaodasilva',
  email: 'joao@exemplo.com',
  bio: 'Designer & desenvolvedor front-end. Apaixonado por interfaces limpas e experiências que fazem sentido. Construindo o futuro, um pixel de cada vez.',
  location: 'Joinville, SC',
  memberSince: 'jan. 2023',
  website: 'portfolio.dev',
  avatarUrl: '',
})

const initials = computed(() => {
  const parts = user.value.name.split(' ')
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
})

const stats = [
  { label: 'Posts', value: '248' },
  { label: 'Seguidores', value: '12.4 mil' },
  { label: 'Seguindo', value: '841' },
  { label: 'Engajamento', value: '98.2%' },
]

const tabs = ['Posts', 'Salvos', 'Curtidos', 'Sobre']
const activeTab = ref('Posts')

const posts = [
  { id: 1, ph: 'ph-a', icon: 'ti-layout-dashboard' },
  { id: 2, ph: 'ph-b', icon: 'ti-code' },
  { id: 3, ph: 'ph-c', icon: 'ti-camera' },
  { id: 4, ph: 'ph-b', icon: 'ti-palette' },
  { id: 5, ph: 'ph-a', icon: 'ti-photo' },
  { id: 6, ph: 'ph-c', icon: 'ti-brand-figma' },
]
</script>
<template>
  <div class="page">
    <div class="card">

      <!-- Cover -->
      <div class="cover">
        <div class="cover-dots"></div>
        <div class="cover-actions">
          <router-link to="/configuracoes" class="cover-btn">
            <i class="ti ti-edit" aria-hidden="true"></i> Editar perfil
          </router-link>
          <router-link to="/settings" class="cover-btn">
            <i class="ti ti-settings" aria-hidden="true"></i> Configurações
          </router-link>
        </div>
        <div class="avatar-wrap">
          <div class="avatar-ring">
            <div class="avatar-inner">
              <img v-if="user.avatarUrl" :src="user.avatarUrl" :alt="user.name" />
              <span v-else>{{ initials }}</span>
            </div>
          </div>
          <router-link to="/configuracoes" class="avatar-edit-btn" aria-label="Alterar foto de perfil">
            <i class="ti ti-camera" aria-hidden="true"></i>
          </router-link>
        </div>
      </div>

      <!-- Body -->
      <div class="profile-body">
        <div class="profile-top">
          <div>
            <div class="profile-name">{{ user.name }}</div>
            <div class="profile-handle">@{{ user.handle }} · {{ user.email }}</div>
          </div>
          <div class="profile-badge">
            <i class="ti ti-shield-check" aria-hidden="true"></i>
            Verificado
          </div>
        </div>

        <p class="profile-bio">{{ user.bio }}</p>

        <div class="profile-stats">
          <div v-for="stat in stats" :key="stat.label" class="stat">
            <span class="stat-num">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>

        <div class="profile-meta">
          <div class="meta-item" v-if="user.location">
            <i class="ti ti-map-pin" aria-hidden="true"></i>
            {{ user.location }}
          </div>
          <div class="meta-item">
            <i class="ti ti-calendar" aria-hidden="true"></i>
            Membro desde {{ user.memberSince }}
          </div>
          <div class="meta-item" v-if="user.website">
            <i class="ti ti-world" aria-hidden="true"></i>
            <a :href="user.website" target="_blank">{{ user.website }}</a>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <div
          v-for="tab in tabs"
          :key="tab"
          class="tab"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ tab }}
        </div>
      </div>

      <!-- Posts grid -->
      <div class="posts-grid">
        <div
          v-for="post in posts"
          :key="post.id"
          class="post-thumb"
          :class="post.ph"
        >
          <i :class="`ti ${post.icon}`" aria-hidden="true"></i>
        </div>
      </div>

    </div>
  </div>
</template>



<style scoped>
.page {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
}

.cover {
  height: 120px;
  background: linear-gradient(135deg, #0d0d1f 0%, #111126 50%, #0f0f1a 100%);
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 0 28px;
}

.cover-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, #7c9eff14 1px, transparent 1px);
  background-size: 24px 24px;
}

.cover-actions {
  position: absolute;
  top: 12px;
  right: 16px;
  display: flex;
  gap: 8px;
}

.cover-btn {
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid var(--border2);
  background: rgba(8, 8, 9, 0.6);
  color: var(--txt2);
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}

.cover-btn:hover {
  background: rgba(8, 8, 9, 0.85);
  color: var(--txt);
}

.cover-btn .ti {
  font-size: 15px;
}

.avatar-wrap {
  position: relative;
  margin-bottom: -44px;
  z-index: 2;
}

.avatar-ring {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  padding: 3px;
}

.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--card);
  border: 2px solid var(--card);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: -1px;
  overflow: hidden;
}

.avatar-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-edit-btn {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--card2);
  border: 1.5px solid var(--border2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s, border-color 0.15s;
  z-index: 3;
}

.avatar-edit-btn:hover {
  background: #1e1e28;
  border-color: var(--accent);
}

.avatar-edit-btn .ti {
  font-size: 13px;
  color: var(--txt2);
}

.profile-body {
  padding: 56px 28px 28px;
}

.profile-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}

.profile-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--txt);
  letter-spacing: -0.4px;
  line-height: 1.2;
}

.profile-handle {
  font-size: 0.82rem;
  color: var(--txt3);
  margin-top: 2px;
}

.profile-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.72rem;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(124, 158, 255, 0.1);
  color: var(--accent);
  border: 1px solid rgba(124, 158, 255, 0.2);
  white-space: nowrap;
}

.profile-badge .ti {
  font-size: 13px;
}

.profile-bio {
  font-size: 0.875rem;
  color: var(--txt2);
  line-height: 1.6;
  margin-bottom: 20px;
}

.profile-stats {
  display: flex;
  gap: 28px;
  padding: 16px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin-bottom: 20px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-num {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--txt);
  letter-spacing: -0.3px;
}

.stat-label {
  font-size: 0.72rem;
  color: var(--txt3);
}

.profile-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--txt3);
}

.meta-item .ti {
  font-size: 16px;
}

.meta-item a {
  color: var(--accent);
  text-decoration: none;
}

.tabs {
  display: flex;
  border-top: 1px solid var(--border);
}

.tab {
  flex: 1;
  padding: 12px;
  text-align: center;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--txt3);
  cursor: pointer;
  transition: color 0.15s;
  position: relative;
}

.tab.active {
  color: var(--txt);
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  height: 2px;
  background: var(--accent);
  border-radius: 2px 2px 0 0;
}

.tab:hover:not(.active) {
  color: var(--txt2);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

.post-thumb {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  opacity: 0.15;
  cursor: pointer;
  transition: opacity 0.15s;
}

.post-thumb:hover {
  opacity: 0.25;
}

.post-thumb .ti {
  font-size: 28px;
  color: var(--txt);
}

.ph-a { background: linear-gradient(135deg, #0a0a16, #16102a); }
.ph-b { background: linear-gradient(160deg, #080c14, #0d1824); }
.ph-c { background: linear-gradient(135deg, #0c100a, #141a0e); }
</style>