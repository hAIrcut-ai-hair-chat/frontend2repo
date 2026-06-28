<template>
  <div id="app">
    <AppHeader />
    <div class="layout">
      <SidebarLeft />
      <main>
        <StoriesBar :stories="stories" />
        <ComposeBox />
        <PostFeed :posts="posts" @delete="deletePost" />
      </main>
      <SidebarRight :trends="trends" :suggestions="suggestions" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import SidebarLeft from '@/components/SidebarLeft.vue'
import SidebarRight from '@/components/SidebarRight.vue'
import StoriesBar from '@/components/StoriesBar.vue'
import ComposeBox from '@/components/ComposeBox.vue'
import PostFeed from '@/components/PostFeed.vue'

const stories = ref([
  { id: 1, name: 'Ana Silva', avatar: 'https://i.pravatar.cc/60?img=11' },
  { id: 2, name: 'Carlos M.', avatar: 'https://i.pravatar.cc/60?img=32' },
  { id: 3, name: 'Luisa R.', avatar: 'https://i.pravatar.cc/60?img=47' },
  { id: 4, name: 'Pedro K.', avatar: 'https://i.pravatar.cc/60?img=5' },
  { id: 5, name: 'Mari T.', avatar: 'https://i.pravatar.cc/60?img=25' },
])

const posts = ref([
  {
    id: 1,
    user: 'Ana Silva',
    avatar: 'https://i.pravatar.cc/40?img=11',
    initials: null,
    gradient: null,
    time: '2 horas atrás',
    category: 'Design',
    tags: [{ label: '#UIDesign', type: 'blue' }, { label: '#DarkMode', type: 'purple' }],
    image: null,
    imageIcon: 'ti-layout-dashboard',
    imageClass: 'ph-1',
    likes: 1248,
    comments: 48,
    caption: 'Finalizei o novo sistema de design para o app. Cores, tipografia e dark mode totalmente repensados — adorei o resultado ✨',
    time2: 'Hoje às 14:32',
    liked: true,
    bookmarked: true,
  },
  {
    id: 2,
    user: 'Carlos Mendes',
    avatar: null,
    initials: 'CM',
    gradient: 'linear-gradient(135deg,#7c9eff,#a78bfa)',
    time: '5 horas atrás',
    category: 'Dev',
    tags: [{ label: '#TypeScript', type: 'purple' }, { label: '#WebDev', type: 'blue' }],
    image: null,
    imageIcon: 'ti-code',
    imageClass: 'ph-2',
    likes: 892,
    comments: 31,
    caption: 'Migrei meu projeto inteiro para TypeScript 5.5 e os novos recursos de inferência de tipo são simplesmente absurdos. Vale muito a pena.',
    time2: 'Hoje às 11:15',
    liked: false,
    bookmarked: false,
  },
  {
    id: 3,
    user: 'Luisa Ramos',
    avatar: 'https://i.pravatar.cc/40?img=47',
    initials: null,
    gradient: null,
    time: 'Ontem',
    category: 'Fotografia',
    tags: [{ label: '#Fotografia', type: 'pink' }, { label: '#Arte', type: 'blue' }],
    image: null,
    imageIcon: 'ti-camera',
    imageClass: 'ph-3',
    likes: 3412,
    comments: 117,
    caption: 'Sessão fotográfica no pôr do sol de ontem. Às vezes a natureza já faz todo o trabalho de composição pra você 🌅',
    time2: 'Ontem às 19:47',
    liked: false,
    bookmarked: false,
  },
])

const trends = ref([
  { id: 1, name: '#UIDesign', count: '12.4 mil posts' },
  { id: 2, name: '#TypeScript', count: '8.9 mil posts' },
  { id: 3, name: '#DarkMode', count: '6.2 mil posts' },
  { id: 4, name: '#Fotografia', count: '4.7 mil posts' },
])

const suggestions = ref([
  { id: 1, name: 'Mariana T.', sub: 'Designer · 4.1 mil seg.', initials: 'MT', gradient: 'linear-gradient(135deg,#f472b6,#a78bfa)', avatar: null },
  { id: 2, name: 'Pedro K.', sub: 'Dev · 2.8 mil seg.', initials: 'PK', gradient: 'linear-gradient(135deg,#34d399,#7c9eff)', avatar: null },
  { id: 3, name: 'Sofia N.', sub: 'Fotógrafa · 9.3 mil seg.', initials: null, gradient: null, avatar: 'https://i.pravatar.cc/34?img=5' },
])

function deletePost(id) {
  posts.value = posts.value.filter(p => p.id !== id)
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

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
  --amber: #fbbf24;
  --r: 14px;
  --font: 'Inter', system-ui, sans-serif;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: var(--bg);
  font-family: var(--font);
  color: var(--txt);
  -webkit-font-smoothing: antialiased;
}

#app { min-height: 100vh; }

.layout {
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px 16px;
  display: grid;
  grid-template-columns: 200px 1fr 220px;
  gap: 24px;
}

@media (max-width: 960px) {
  .layout { grid-template-columns: 1fr; }
}
</style>