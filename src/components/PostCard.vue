<template>
  <article class="post">
    <div class="post-hdr">
      <img v-if="post.avatar" :src="post.avatar" :alt="post.user" class="avi" />
      <div
        v-else
        class="avi avi-grad"
        :style="{ background: post.gradient }"
      >
        {{ post.initials }}
      </div>

      <div class="post-meta">
        <div class="post-name">{{ post.user }}</div>
        <div class="post-sub">
          <i class="ti ti-clock" style="font-size:12px"></i>
          {{ post.time }} · {{ post.category }}
        </div>
      </div>

      <div class="more-btn">
        <i class="ti ti-dots"></i>
      </div>
    </div>

    <div class="post-tags">
      <span
        v-for="tag in post.tags"
        :key="tag.label"
        class="tag"
        :class="`tag-${tag.type}`"
      >
        {{ tag.label }}
      </span>
    </div>

    <img
      v-if="post.image"
      :src="post.image"
      class="post-img"
      :alt="`Post de ${post.user}`"
    />
    <div v-else class="post-img-ph" :class="post.imageClass">
      <i :class="`ti ${post.imageIcon} ph-icon`"></i>
    </div>

    <div class="actions">
      <button
        class="act-btn"
        :class="{ liked: post.liked }"
        @click="toggleLike"
        :aria-label="`Curtir (${formatCount(localLikes)} curtidas)`"
      >
        <i :class="post.liked ? 'ti ti-heart-filled' : 'ti ti-heart'"></i>
        {{ formatCount(localLikes) }}
      </button>

      <button class="act-btn" :aria-label="`Comentar (${post.comments} comentários)`">
        <i class="ti ti-message-circle"></i>
        {{ post.comments }}
      </button>

      <div class="act-spacer"></div>

      <button
        class="act-btn"
        :class="{ bookmarked: post.bookmarked }"
        @click="toggleBookmark"
        aria-label="Salvar"
      >
        <i :class="post.bookmarked ? 'ti ti-bookmark-filled' : 'ti ti-bookmark'"></i>
      </button>

      <button class="share-btn" aria-label="Compartilhar">
        <i class="ti ti-share"></i>
        Compartilhar
      </button>

      <button class="act-btn delete-btn" @click="$emit('delete')" aria-label="Excluir post">
        <i class="ti ti-trash"></i>
      </button>
    </div>

    <div class="info">
      <div class="likes">{{ formatCount(localLikes) }} curtidas</div>
      <div class="caption">
        <strong>{{ post.user }}</strong>
        {{ post.caption }}
      </div>
      <div class="time">{{ post.time2 }}</div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ post: Object })
defineEmits(['delete'])

const localLikes = ref(props.post.likes)

function toggleLike() {
  props.post.liked = !props.post.liked
  localLikes.value += props.post.liked ? 1 : -1
}

function toggleBookmark() {
  props.post.bookmarked = !props.post.bookmarked
}

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + ' mil'
  return String(n)
}
</script>

<style scoped>
.post {
  background: var(--card);
  border-radius: var(--r);
  border: 1px solid var(--border);
  overflow: hidden;
  transition: border-color 0.2s;
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
  font-size: 0.72rem;
  color: var(--txt3);
  display: flex;
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
  background: linear-gradient(135deg, #0a0a16 0%, #16102a 40%, #1a0e24 100%);
}

.ph-2 {
  height: 240px;
  background: linear-gradient(160deg, #080c14 0%, #0d1824 50%, #101420 100%);
}

.ph-3 {
  height: 260px;
  background: linear-gradient(135deg, #0c100a 0%, #141a0e 50%, #10160a 100%);
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
  transition: background 0.15s, color 0.15s;
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
  transition: background 0.15s, color 0.15s, border-color 0.15s;
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
</style>
