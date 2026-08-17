<template>
  <section class="feed">

    <!-- Carregando -->
    <div v-if="loading" class="loading-placeholder">
      <i class="ti ti-loader-2 spinning"></i>
      Carregando feed...
    </div>

    <!-- Erro -->
    <div v-else-if="loadError" class="error-placeholder">
      {{ loadError }}
    </div>

    <!-- Sem posts -->
    <div v-else-if="posts.length === 0" class="loading-placeholder">
      <i class="ti ti-message-circle"></i>
      <p>Nenhuma postagem ainda.</p>
    </div>

    <!-- Posts -->
    <article
      v-for="post in posts"
      :key="post.id"
      class="post"
    >

      <!-- Cabeçalho -->
      <div class="post-hdr">

        <!-- Avatar com imagem -->
        <img
          v-if="post.avatar"
          :src="post.avatar"
          :alt="post.user"
          class="avi"
        />

        <!-- Avatar com iniciais -->
        <div
          v-else
          class="avi avi-grad"
          :style="{
            background: post.avatarColor
          }"
        >
          {{ post.initials }}
        </div>

        <div class="post-meta">
          <div class="post-name">
            {{ post.user }}
          </div>

          <div class="post-sub">
            <span>{{ post.time }}</span>

            <span v-if="post.category">
              · {{ post.category }}
            </span>
          </div>
        </div>

        <button
          class="more-btn"
          type="button"
        >
          <i class="ti ti-dots"></i>
        </button>
      </div>

      <!-- Tags -->
      <div
        v-if="post.tags && post.tags.length"
        class="post-tags"
      >
        <span
          v-for="(tag, index) in post.tags"
          :key="index"
          class="tag"
          :class="{
            'tag-blue': index % 3 === 0,
            'tag-purple': index % 3 === 1,
            'tag-pink': index % 3 === 2
          }"
        >
          #{{ tag }}
        </span>
      </div>

      <!-- Imagem -->
      <template v-if="post.image">

        <img
          :src="post.image"
          :alt="post.caption || 'Imagem da postagem'"
          class="post-img"
        />

      </template>

      <!-- Placeholder quando não há imagem -->
      <div
        v-else
        class="post-img-ph"
        :class="post.imageClass"
      >
        <i
          class="ti ph-icon"
          :class="post.imageIcon"
        ></i>
      </div>

      <!-- Ações -->
      <div class="actions">

        <!-- Curtir -->
        <button
          type="button"
          class="act-btn"
          :class="{ liked: post.liked }"
          @click="toggleLike(post)"
        >
          <i
            class="ti"
            :class="
              post.liked
                ? 'ti-heart-filled'
                : 'ti-heart'
            "
          ></i>

          <span>
            {{ formatCount(post.likes) }}
          </span>
        </button>

        <!-- Comentários -->
        <button
          type="button"
          class="act-btn"
        >
          <i class="ti ti-message-circle"></i>

          <span>
            {{ formatCount(post.comments) }}
          </span>
        </button>

        <div class="act-spacer"></div>

        <!-- Bookmark -->
        <button
          type="button"
          class="act-btn"
          :class="{
            bookmarked: post.bookmarked
          }"
          @click="toggleBookmark(post)"
        >
          <i
            class="ti"
            :class="
              post.bookmarked
                ? 'ti-bookmark-filled'
                : 'ti-bookmark'
            "
          ></i>
        </button>

        <!-- Compartilhar -->
        <button
          type="button"
          class="share-btn"
        >
          <i class="ti ti-share-3"></i>
          Compartilhar
        </button>

      </div>

      <!-- Informações -->
      <div class="info">

        <div
          v-if="post.likes > 0"
          class="likes"
        >
          {{ formatCount(post.likes) }}
          {{ post.likes === 1 ? 'curtida' : 'curtidas' }}
        </div>

        <div class="caption">
          <strong>{{ post.user }}</strong>
          {{ post.caption }}
        </div>

        <div
          v-if="post.time2"
          class="time"
          :title="post.time2"
        >
          {{ post.time2 }}
        </div>

      </div>

    </article>

  </section>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted
} from 'vue'

import { useFeedStore } from '@/stores/postSocket'

const MAX_POSTS = 50

const feedStore = useFeedStore()

const loading = ref(true)

const loadError = ref(null)

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #7c9eff, #a78bfa)',
  'linear-gradient(135deg, #f472b6, #a78bfa)',
  'linear-gradient(135deg, #34d399, #22d3ee)',
  'linear-gradient(135deg, #fb923c, #f472b6)',
  'linear-gradient(135deg, #60a5fa, #34d399)'
]

const posts = feedStore.posts

function getAvatarColor(seed) {
  if (!seed) {
    return AVATAR_GRADIENTS[0]
  }

  let hash = 0

  for (let i = 0; i < seed.length; i++) {
    hash =
      seed.charCodeAt(i) +
      ((hash << 5) - hash)
  }

  return AVATAR_GRADIENTS[
    Math.abs(hash) %
    AVATAR_GRADIENTS.length
  ]
}

function getInitials(name) {
  if (!name) {
    return '?'
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(
      part =>
        part[0]?.toUpperCase()
    )
    .join('')
}

function formatTime(isoDate) {
  if (!isoDate) {
    return ''
  }

  const date = new Date(isoDate)

  if (isNaN(date.getTime())) {
    return ''
  }

  const diffMs =
    Date.now() -
    date.getTime()

  const diffMin =
    Math.floor(
      diffMs / 60000
    )

  if (diffMin < 1) {
    return 'agora'
  }

  if (diffMin < 60) {
    return `${diffMin}min`
  }

  const diffH =
    Math.floor(
      diffMin / 60
    )

  if (diffH < 24) {
    return `${diffH}h`
  }

  return date.toLocaleDateString(
    'pt-BR'
  )
}

function formatFullTime(isoDate) {
  if (!isoDate) {
    return ''
  }

  const date = new Date(isoDate)

  if (isNaN(date.getTime())) {
    return ''
  }

  return date.toLocaleString(
    'pt-BR'
  )
}

function mapPost(raw) {
  if (!raw) {
    return null
  }

  const rawUser =
    raw.user || {}

  const userName =
    rawUser.nome ||
    rawUser.name ||
    rawUser.email ||
    'Usuário'

  const imageUrl =
    typeof raw.image === 'string'
      ? raw.image
      : raw.image?.file ||
        null

  return {
    id:
      raw.id ??
      raw.pk,

    user:
      userName,

    avatar:
      rawUser.avatar ||
      null,

    initials:
      getInitials(
        userName
      ),

    avatarColor:
      getAvatarColor(
        userName
      ),

    time:
      formatTime(
        raw.uploaded_on
      ),

    time2:
      formatFullTime(
        raw.uploaded_on
      ),

    category:
      raw.category ||
      '',

    tags:
      raw.tags ||
      [],

    image:
      imageUrl,

    imageClass:
      raw.imageClass ||
      'ph-1',

    imageIcon:
      raw.imageIcon ||
      'ti-photo',

    liked:
      raw.liked ??
      false,

    likes:
      raw.likes ??
      0,

    comments:
      raw.comments ??
      0,

    bookmarked:
      raw.bookmarked ??
      false,

    caption:
      raw.text ||
      ''
  }
}

function toggleLike(post) {
  post.liked =
    !post.liked

  post.likes +=
    post.liked
      ? 1
      : -1
}

function toggleBookmark(post) {
  post.bookmarked =
    !post.bookmarked
}

function formatCount(n) {
  if (n >= 1000) {
    return (
      (n / 1000)
        .toFixed(1)
        .replace(
          '.0',
          ''
        ) +
      ' mil'
    )
  }

  return String(n)
}

onMounted(() => {
  try {
    feedStore.connect(
      'global'
    )

    loading.value = false
  } catch (error) {
    console.error(
      'Erro ao conectar ao Feed:',
      error
    )

    loadError.value =
      error.message ||
      'Erro ao conectar ao Feed'

    loading.value = false
  }
})

onUnmounted(() => {
  feedStore.disconnect()
})
</script>

<style scoped>
.post {
  background: var(--card);
  border-radius: var(--r);
  border: 1px solid var(--border);
  overflow: hidden;
  transition: border-color 0.2s;
  top: 10px;
  margin-top: 10px;
}

.post:hover {
  border-color: var(--border2);
}

.post-hdr {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 13px 15px;
}

.avi {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid var(--border2);
}

.avi-grad {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}

.post-meta {
  flex: 1;
}

.post-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--txt);
  line-height: 1.3;
}

.post-sub {
  color: var(--txt3);
  display: flex;
  font-size: 0.72rem;
  align-items: center;
  gap: 4px;
}

.more-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s;
}

.more-btn:hover {
  background: rgba(255, 255, 255, 0.05);
}

.more-btn .ti {
  color: var(--txt3);
  font-size: 20px;
}

.post-tags {
  display: flex;
  gap: 6px;
  padding: 10px 15px 0;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.68rem;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 20px;
  border: 1px solid;
  letter-spacing: 0.02em;
}

.tag-blue {
  color: var(--accent);
  border-color: rgba(124, 158, 255, 0.25);
  background: rgba(124, 158, 255, 0.07);
}

.tag-purple {
  color: var(--accent2);
  border-color: rgba(167, 139, 250, 0.25);
  background: rgba(167, 139, 250, 0.07);
}

.tag-pink {
  color: var(--rose);
  border-color: rgba(244, 114, 182, 0.25);
  background: rgba(244, 114, 182, 0.07);
}

.post-img {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  display: block;
}

.post-img-ph {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ph-1 {
  height: 280px;
  background: linear-gradient(
    135deg,
    #0a0a16 0%,
    #16102a 40%,
    #1a0e24 100%
  );
}

.ph-2 {
  height: 240px;
  background: linear-gradient(
    160deg,
    #080c14 0%,
    #0d1824 50%,
    #101420 100%
  );
}

.ph-3 {
  height: 260px;
  background: linear-gradient(
    135deg,
    #0c100a 0%,
    #141a0e 50%,
    #10160a 100%
  );
}

.ph-icon {
  font-size: 40px;
  opacity: 0.18;
  color: var(--txt);
}

.actions {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 10px 2px;
}

.act-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--txt2);
  font-size: 0.8rem;
  font-family: var(--font);
  background: transparent;
  border: none;
  transition:
    background 0.15s,
    color 0.15s;
}

.act-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--txt);
}

.act-btn .ti {
  font-size: 20px;
}

.act-btn.liked {
  color: var(--rose);
}

.act-btn.liked .ti {
  color: var(--rose);
}

.act-btn.bookmarked {
  color: var(--accent);
}

.act-btn.bookmarked .ti {
  color: var(--accent);
}

.delete-btn:hover {
  color: #f87171 !important;
}

.act-spacer {
  flex: 1;
}

.share-btn {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid var(--border2);
  background: transparent;
  color: var(--txt2);
  font-family: var(--font);
  font-size: 0.78rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s;
}

.share-btn:hover {
  background: var(--card2);
  color: var(--txt);
  border-color: #3a3a46;
}

.share-btn .ti {
  font-size: 16px;
}

.info {
  padding: 6px 15px 16px;
  font-size: 0.85rem;
  color: var(--txt2);
  line-height: 1.55;
}

.likes {
  font-weight: 600;
  color: var(--txt);
  font-size: 0.88rem;
  margin-bottom: 3px;
}

.caption {
  word-break: break-word;
}

.caption strong {
  color: var(--txt);
  font-weight: 600;
  margin-right: 6px;
}

.time {
  font-size: 0.72rem;
  color: var(--txt3);
  margin-top: 4px;
  letter-spacing: 0.01em;
}

.loading-placeholder {
  padding: 1rem;
  text-align: center;
  color: #888;
}

.error-placeholder {
  color: #f87171;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
