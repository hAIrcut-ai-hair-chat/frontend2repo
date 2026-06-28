<template>
  <div class="app-container">

     <header class="top-header">
      <div class="header-left">
        <span class="mdi mdi-soccer brand-icon"></span>
        <span class="brand">SportsGram</span>
      </div>

      <div class="search-box">
        <span class="mdi mdi-magnify"></span>
        <input v-model="search" placeholder="Pesquisar atletas, times..." />
      </div>

      <div class="header-right">
        <span class="mdi mdi-bell-outline icon-btn"></span>
        <span class="mdi mdi-message-outline icon-btn"></span>
      </div>
    </header>

    <!-- STORIES -->
    <section class="stories">
      <div
        v-for="story in stories"
        :key="story.id"
        class="story"
      >
        <img :src="story.avatar" />
        <span>{{ story.name }}</span>
      </div>
    </section>

     <main class="feed">

      <div v-for="post in filteredPosts" :key="post.id" class="post-card">

        <div class="post-header">
          <img :src="post.avatar" class="avatar" />

          <div class="post-user">
            <span class="username">{{ post.username }}</span>
            <span class="post-time">{{ post.time }}</span>
          </div>

          <div class="menu-wrapper">
            <span class="mdi mdi-dots-horizontal" @click="toggleMenu(post.id)"></span>

            <div v-if="post.showMenu" class="dropdown-menu">
              <button @click="followUser(post)">Seguir</button>
              <button @click="savePost(post)">Salvar</button>
              <button @click="hidePost(post.id)">Ocultar</button>
            </div>
          </div>
        </div>

        <div class="post-image-wrapper">
          <img :src="post.image" class="post-image" />
        </div>

         <div class="post-actions">

          <button @click="toggleLike(post)" class="action-btn">
            <span class="mdi" :class="post.liked ? 'mdi-heart' : 'mdi-heart-outline'"></span>
          </button>

          <button class="action-btn">
            <span class="mdi mdi-comment-outline"></span>
          </button>

          <button class="action-btn" @click="sharePost(post)">
            <span class="mdi mdi-share-variant-outline"></span>
          </button>

          <button class="action-btn" style="margin-left:auto" @click="toggleSave(post)">
            <span class="mdi" :class="post.saved ? 'mdi-bookmark' : 'mdi-bookmark-outline'"></span>
          </button>

        </div>

        <div class="stats">
          <strong>{{ post.likes }} curtidas</strong>
          <span>{{ post.comments }} comentários</span>
          <span>{{ post.shares }} compartilhamentos</span>
        </div>

        <!-- CAPTION -->
        <div class="caption">
          <strong>{{ post.username }}</strong> {{ post.caption }}
        </div>

      </div>

    </main>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')

const stories = ref([
  { id: 1, name: 'Neymar', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'LeBron', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Medina', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'Flamengo', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, name: 'NBA', avatar: 'https://i.pravatar.cc/150?img=5' }
])

const posts = ref([
  {
    id: 1,
    username: 'neymarjr',
    avatar: 'https://i.pravatar.cc/150?img=1',
    image: 'https://picsum.photos/600/400?1',
    caption: 'Mais uma vitória 🔥',
    time: '2h',
    likes: 1200,
    comments: 54,
    shares: 12,
    liked: false,
    saved: false,
    showMenu: false
  },
  {
    id: 2,
    username: 'nba',
    avatar: 'https://i.pravatar.cc/150?img=2',
    image: 'https://picsum.photos/600/400?2',
    caption: 'Que jogada absurda!',
    time: '4h',
    likes: 5400,
    comments: 210,
    shares: 88,
    liked: false,
    saved: false,
    showMenu: false
  }
])

const filteredPosts = computed(() => {
  if (!search.value) return posts.value
  return posts.value.filter(p =>
    p.username.toLowerCase().includes(search.value.toLowerCase())
  )
})

function toggleLike(post) {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

function toggleSave(post) {
  post.saved = !post.saved
}

function sharePost(post) {
  post.shares++
  alert('Post compartilhado!')
}

function toggleMenu(id) {
  posts.value.forEach(p => {
    if (p.id === id) p.showMenu = !p.showMenu
    else p.showMenu = false
  })
}

function followUser(post) {
  alert('Seguindo ' + post.username)
}

function savePost(post) {
  post.saved = true
}

function hidePost(id) {
  posts.value = posts.value.filter(p => p.id !== id)
}
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css");

.app-container {
  max-width: 650px;
  margin: auto;
  font-family: Arial;
}

/* HEADER */
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  background: white;
}

.brand {
  font-weight: bold;
  color: #1877f2;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 5px;
  background: #f0f2f5;
  padding: 5px 10px;
  border-radius: 20px;
}

.search-box input {
  border: none;
  outline: none;
  background: transparent;
}

/* STORIES */
.stories {
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 10px;
}

.story {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
}

.story img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #1877f2;
}

/* POST */
.post-card {
  margin: 10px 0;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  background: white;
}

.post-header {
  display: flex;
  align-items: center;
  padding: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.post-user {
  margin-left: 10px;
}

.username {
  font-weight: bold;
}

.post-image {
  width: 100%;
}

/* ACTIONS */
.post-actions {
  display: flex;
  gap: 10px;
  padding: 10px;
}

.action-btn {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
}

/* STATS */
.stats {
  font-size: 12px;
  padding: 0 10px;
  color: gray;
}

/* MENU */
.menu-wrapper {
  margin-left: auto;
  position: relative;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 20px;
  background: white;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
}

.dropdown-menu button {
  padding: 5px 10px;
  border: none;
  background: none;
  cursor: pointer;
}
</style>