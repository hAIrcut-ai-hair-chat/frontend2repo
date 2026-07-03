<!-- Profile.vue -->
<template>
  <div class="page">
    <TopBar />
    <CoverBar />
    <Hero :user="user" :stats="stats" />
    <TabsBar v-model="activeTab" :tabs="tabs" />
    <div class="content">
      <PostsArea :posts="posts" :activeTab="activeTab" />
      <SideBar :user="user" :skills="skills" :activities="activities" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TopBar from '@/components/TopBar.vue'
import CoverBar from '@/components/CoverBar.vue'
import Hero from '@/components/Hero.vue'
import TabsBar from '@/components/TabsBar.vue'
import PostArea from '@/components/PostArea.vue'
import SideBar from '@/components/SideBar.vue'

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

const stats = [
  { label: 'Seguidores', value: '12.4 mil' },
  { label: 'Seguindo', value: '841' },
  { label: 'Curtidas', value: '3.2 mil' },
]

const tabs = ['Work', 'Moodboards', 'Curtidos', 'Sobre']
const activeTab = ref('Work')

const posts = [
  { id: 1, title: 'Dashboard Analytics', category: 'UI Design · Web', likes: 517, views: '9.3k', ph: 'ph-a', icon: 'ti-layout-dashboard' },
  { id: 2, title: 'App de Saúde', category: 'Mobile UI · Branding', likes: 983, views: '14k', ph: 'ph-b', icon: 'ti-device-mobile' },
  { id: 3, title: 'Brand Identity', category: 'Branding · Print', likes: 875, views: '13.5k', ph: 'ph-c', icon: 'ti-palette' },
  { id: 4, title: 'Dev Portfolio', category: 'Web · Front-end', likes: 612, views: '7.8k', ph: 'ph-b', icon: 'ti-code' },
  { id: 5, title: 'Design System', category: 'UI Design · Figma', likes: 1400, views: '22k', ph: 'ph-a', icon: 'ti-brand-figma' },
  { id: 6, title: 'Data Visualization', category: 'Web · Charts', likes: 438, views: '5.2k', ph: 'ph-c', icon: 'ti-chart-bar' },
]

const skills = ['UI Design', 'Figma', 'Vue.js', 'Branding', 'TypeScript', 'CSS', 'Illustrator', 'React']
const activities = [
  { icon: 'ti-heart', title: 'Curtiu Design System', time: 'há 2 horas' },
  { icon: 'ti-message-circle', title: 'Comentou em Mobile App', time: 'há 5 horas' },
  { icon: 'ti-upload', title: 'Publicou Brand Identity', time: 'ontem' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

* { margin:0; padding:0; box-sizing:border-box; }

:root {
  --bg: #080809;
  --card: #0f0f11;
  --card2: #141416;
  --border: #1e1e22;
  --border2: #2a2a30;
  --txt: #ececec;
  --txt2: #8a8a96;
  --txt3: #484854;
  --accent: #7c9eff;
  --accent2: #a78bfa;
  --rose: #f472b6;
  --success: #34d399;
  --r: 14px;
  --font: 'Inter', system-ui, sans-serif;
}

body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--txt);
  -webkit-font-smoothing: antialiased;
}

.page {
  max-width: 1280px;
  margin: 0 auto;
  background: var(--bg);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 0;
  min-height: 400px;
  background: var(--card);
}
</style>