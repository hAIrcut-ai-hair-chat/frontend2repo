<template>
  <div class="weGym-feed">
    <div class="feed-stats">
      <span>🏋️ Total de Curtidas: {{ totalLikes }}</span>
      <span>🏆 Post mais curtido: @{{ mostLikedPost?.author || 'Nenhum' }}</span>
    </div>

    <div class="stories">
      <div v-for="story in stories" :key="story.id" class="story-item">
        <div class="story-avatar">
          <img :src="story.avatar" :alt="story.name" />
        </div>
        <span>{{ story.name }}</span>
      </div>
    </div>

    <div class="filter-bar">
      <input
        v-model="searchTag"
        placeholder="🔍 Filtrar por hashtag (ex: corrida)"
        class="filter-input"
      />
      <button @click="searchTag = ''" class="clear-filter">Limpar</button>
    </div>

    <div v-for="post in filteredPosts" :key="post.id" class="post">
      <div class="post-header">
        <img :src="post.avatar" alt="avatar" class="avatar" />
        <div class="post-user">
          <strong>@{{ post.author }}</strong>
          <span class="post-time">{{ post.time }}</span>
        </div>
        <span v-if="post.location" class="post-location">📍 {{ post.location }}</span>
      </div>

      <div class="post-content">
        <p>{{ post.text }}</p>
        <div v-if="post.image" class="post-image">
          <img :src="post.image" alt="Imagem do post" />
        </div>
        <div v-if="post.video" class="post-video">
          <video controls>
            <source :src="post.video" type="video/mp4" />
            Seu navegador não suporta vídeo.
          </video>
        </div>
        <div class="post-hashtags">
          <span v-for="tag in post.hashtags" :key="tag">#{{ tag }} </span>
        </div>
      </div>

      <div class="post-actions">
        <button @click="handleLike(post.id)" class="like-btn">
          <span>{{ post.liked ? '❤️' : '🤍' }}</span>
          {{ post.likes }}
        </button>
        <button @click="focusComment(post.id)" class="comment-btn">
          💬 {{ post.comments.length }}
        </button>
        <button class="share-btn">🔗 Compartilhar</button>
      </div>

      <div class="post-comments">
        <div v-for="comment in post.comments" :key="comment.id" class="comment">
          <strong>@{{ comment.user }}</strong> {{ comment.text }}
        </div>

        <!-- Input de novo comentário (chama addComment puro) -->
        <div class="add-comment">
          <input
            v-model="commentInputs[post.id]"
            placeholder="Escreva um comentário..."
            @keyup.enter="submitComment(post.id)"
            class="comment-input"
          />
          <button @click="submitComment(post.id)" class="send-btn">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useFeed } from '../composables/useFeed';

// Instanciando o composable funcional
const {
  filteredPosts,
  totalLikes,
  mostLikedPost,
  searchTag,
  handleLike,
  handleAddComment,
  setSearchTag,
} = useFeed(initialPosts);

// Estado local para os inputs de comentário (separado do feed)
const commentInputs = reactive({});

// Vincula o v-model do filtro diretamente
// (usamos setSearchTag para manter imutabilidade se quiser, mas v-model direto no ref também funciona)
// Aqui vamos usar v-model diretamente no searchTag exposto.

// Método para submeter comentário (chama a função pura)
const submitComment = (postId) => {
  const text = commentInputs[postId];
  if (text && text.trim()) {
    handleAddComment(postId, text);
    commentInputs[postId] = ''; // limpa o input
  }
};

// Foca no input (apenas UX)
const focusComment = (postId) => {
  // Poderia usar refs, mas para simplicidade vamos apenas logar ou dar foco no próximo tick
  const input = document.querySelector(`#comment-${postId}`);
  if (input) input.focus();
};

// Expondo stories (são estáticos/imutáveis)
const stories = initialStories;
</script>

<style scoped>
/* Estilos visuais (mantidos do exemplo anterior) */
.weGym-feed {
  max-width: 600px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
  padding: 20px 10px;
}
.feed-stats {
  background: #fff;
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.stories {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 12px 0;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.story-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  min-width: 64px;
}
.story-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
}
.story-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
}
.filter-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.filter-input {
  flex: 1;
  padding: 10px 14px;
  border-radius: 20px;
  border: 1px solid #ddd;
  font-size: 14px;
  background: #fff;
}
.clear-filter {
  background: #e0e0e0;
  border: none;
  border-radius: 20px;
  padding: 0 16px;
  font-weight: bold;
  cursor: pointer;
}
.post {
  background: #fff;
  border-radius: 16px;
  margin-bottom: 20px;
  padding: 16px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.08);
}
.post-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}
.post-user {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.post-time {
  font-size: 12px;
  color: #888;
}
.post-location {
  font-size: 12px;
  color: #555;
  margin-left: auto;
}
.post-content p {
  margin: 0 0 10px 0;
  line-height: 1.4;
  font-size: 15px;
}
.post-image img {
  width: 100%;
  border-radius: 12px;
  max-height: 400px;
  object-fit: cover;
}
.post-video video {
  width: 100%;
  border-radius: 12px;
  max-height: 400px;
}
.post-hashtags {
  margin-top: 8px;
  color: #1d9bf0;
  font-size: 14px;
}
.post-hashtags span {
  margin-right: 6px;
  cursor: pointer;
}
.post-actions {
  display: flex;
  gap: 16px;
  margin: 12px 0 8px 0;
  padding-top: 10px;
  border-top: 1px solid #eee;
}
.post-actions button {
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;
}
.like-btn { color: #ed4956; }
.comment-btn { color: #385185; }
.post-actions button:hover { background: #f0f0f0; }
.post-comments {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #efefef;
}
.comment {
  font-size: 14px;
  margin-bottom: 6px;
}
.comment strong { margin-right: 6px; }
.add-comment {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}
.comment-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  transition: border 0.2s;
}
.comment-input:focus { border-color: #1d9bf0; }
.send-btn {
  background: #1d9bf0;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 0 16px;
  font-weight: bold;
  cursor: pointer;
}
.send-btn:hover { background: #1a8cd8; }
</style>