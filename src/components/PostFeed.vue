<template>
  <div class="feed">
    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @delete="$emit('delete', post.id)"
    />
  </div>
</template>

<script setup>
import PostCard from './PostCard.vue'

defineProps({ posts: Array })
defineEmits(['delete'])
</script>

<style scoped>
.feed {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
