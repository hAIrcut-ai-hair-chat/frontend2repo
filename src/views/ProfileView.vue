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
  { id: 7, ph: 'ph-a', icon: 'ti-video' },
  { id: 8, ph: 'ph-b', icon: 'ti-music' },
  { id: 9, ph: 'ph-c', icon: 'ti-book' },
  { id: 10, ph: 'ph-a', icon: 'ti-map' },
  { id: 11, ph: 'ph-b', icon: 'ti-chart-bar' },
  { id: 12, ph: 'ph-c', icon: 'ti-cloud' },
]
</script>

<template>
  <div class="page">
    <div class="card">

      <!-- Cover -->
      <div class="cover">
        <div class="cover-dots"></div>
        <div class="cover-actions">
          <router-link to="/settings" class="cover-btn">
            <i class="ti ti-settings" aria-hidden="true"></i>
          </router-link>
        </div>
        <div class="avatar-wrap">
          <div class="avatar-ring">
            <div class="avatar-inner">
              <img v-if="user.avatarUrl" :src="user.avatarUrl" :alt="user.name" />
              <span v-else>{{ initials }}</span>
            </div>
          </div>
          <router-link to="/configuracoes" class="avatar-edit-btn" aria-label="Alterar foto">
            <i class="ti ti-camera" aria-hidden="true"></i>
          </router-link>
        </div>
      </div>

      <!-- Profile body -->
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
/* Layout geral: ocupa 100% da largura com padding lateral proporcional */
.page {
  width: 100%;
  padding: 0 6%; /* respiro lateral em telas grandes */
  margin: 0;
  display: block;
  box-sizing: border-box;
}

.card {
  width: 100%;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

/* Cover */
.cover {
  height: 160px;
  background: linear-gradient(145deg, #0b0b1a 0%, #14142b 50%, #0d0d1f 100%);
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 0 32px;
}

.cover-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(124, 158, 255, 0.08) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}

.cover-actions {
  position: absolute;
  top: 16px;
  right: 20px;
  display: flex;
  gap: 8px;
  z-index: 5;
}

.cover-btn {
  padding: 6px 16px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(8, 8, 14, 0.7);
  color: var(--txt2);
  font-size: 0.78rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
}

.cover-btn:hover {
  background: rgba(20, 20, 40, 0.85);
  color: var(--txt);
  border-color: rgba(255, 255, 255, 0.25);
}

.cover-btn .ti {
  font-size: 16px;
}

/* Avatar */
.avatar-wrap {
  position: relative;
  margin-bottom: -48px;
  z-index: 4;
}

.avatar-ring {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  padding: 3px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
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
  font-size: 32px;
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
  bottom: 4px;
  right: 2px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--card2);
  border: 1.5px solid var(--border2);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s;
  z-index: 6;
}

.avatar-edit-btn:hover {
  background: #1e1e2a;
  border-color: var(--accent);
}

.avatar-edit-btn .ti {
  font-size: 14px;
  color: var(--txt2);
}

/* Profile body */
.profile-body {
  padding: 60px 32px 28px;
}

.profile-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--txt);
  letter-spacing: -0.4px;
  line-height: 1.2;
}

.profile-handle {
  font-size: 0.85rem;
  color: var(--txt3);
  margin-top: 2px;
}

.profile-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 4px 14px;
  border-radius: 30px;
  background: rgba(124, 158, 255, 0.1);
  color: var(--accent);
  border: 1px solid rgba(124, 158, 255, 0.2);
  white-space: nowrap;
}

.profile-badge .ti {
  font-size: 14px;
}

.profile-bio {
  font-size: 0.95rem;
  color: var(--txt2);
  line-height: 1.7;
  margin-bottom: 24px;
  max-width: 80%; /* limita largura da bio para não ficar muito extensa */
}

.profile-stats {
  display: flex;
  gap: 40px;
  padding: 20px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin-bottom: 24px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-num {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--txt);
  letter-spacing: -0.3px;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--txt3);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.profile-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--txt3);
}

.meta-item .ti {
  font-size: 17px;
}

.meta-item a {
  color: var(--accent);
  text-decoration: none;
}

.meta-item a:hover {
  text-decoration: underline;
}

/* Tabs */
.tabs {
  display: flex;
  border-top: 1px solid var(--border);
  background: var(--card2);
}

.tab {
  flex: 1;
  padding: 14px 8px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--txt3);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  letter-spacing: 0.02em;
}

.tab.active {
  color: var(--txt);
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 20%;
  right: 20%;
  height: 2.5px;
  background: var(--accent);
  border-radius: 4px 4px 0 0;
}

.tab:hover:not(.active) {
  color: var(--txt2);
  background: rgba(255, 255, 255, 0.02);
}

/* Posts grid - adaptativo */
.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  padding: 3px;
  background: var(--border);
}

.post-thumb {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  opacity: 0.2;
  cursor: pointer;
  transition: all 0.25s ease;
  background: var(--card);
  border-radius: 2px;
}

.post-thumb:hover {
  opacity: 0.4;
  transform: scale(1.02);
  z-index: 2;
}

.post-thumb .ti {
  font-size: 32px;
  color: var(--txt);
}

.ph-a { background: linear-gradient(145deg, #0a0a16, #18102e); }
.ph-b { background: linear-gradient(160deg, #080c14, #0d1a2a); }
.ph-c { background: linear-gradient(145deg, #0c100a, #141e0e); }


@media (min-width: 1024px) {
  .page {
    padding: 0 5%; /* um pouco menos de padding para aproveitar melhor */
  }
  .posts-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .profile-bio {
    max-width: 70%;
  }
}

/* Telas grandes (desktop) */
@media (min-width: 1400px) {
  .page {
    padding: 0 8%;
  }
  .posts-grid {
    grid-template-columns: repeat(5, 1fr);
  }
  .profile-bio {
    max-width: 60%;
  }
}

/* Telas pequenas (tablet/mobile) */
@media (max-width: 768px) {
  .cover {
    height: 140px;
    padding: 0 20px;
  }
  .profile-body {
    padding: 56px 20px 20px;
  }
  .profile-bio {
    max-width: 100%;
    font-size: 0.9rem;
  }
  .profile-stats {
    gap: 20px;
  }
  .posts-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .cover {
    height: 120px;
    padding: 0 16px;
  }
  .cover-actions .cover-btn:first-child {
    display: none;
  }
  .cover-actions .cover-btn:last-child {
    padding: 6px 10px;
  }
  .profile-body {
    padding: 48px 16px 16px;
  }
  .profile-top {
    flex-direction: column;
    align-items: flex-start;
  }
  .profile-badge {
    align-self: flex-start;
  }
  .profile-stats {
    gap: 12px;
    flex-wrap: wrap;
  }
  .stat-num {
    font-size: 1rem;
  }
  .posts-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    padding: 2px;
  }
  .post-thumb .ti {
    font-size: 24px;
  }
}
</style>