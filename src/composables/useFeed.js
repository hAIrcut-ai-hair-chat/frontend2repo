import { ref, computed } from 'vue';

export const toggleLike = (posts, postId) => {
  return posts.map(post =>
    post.id === postId
      ? {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        }
      : post
  );
};

export const addComment = (posts, postId, commentText, user = 'Você') => {
  if (!commentText.trim()) return posts;

  const newComment = {
    id: Date.now() + Math.random(),
    user,
    text: commentText.trim(),
  };

  return posts.map(post =>
    post.id === postId
      ? {
          ...post,
          comments: [...post.comments, newComment],
        }
      : post
  );
};

export const filterByHashtag = (posts, tag) => {
  if (!tag) return posts;

  return posts.filter(post =>
    post.hashtags.some(hashtag =>
      hashtag.toLowerCase().includes(tag.toLowerCase())
    )
  );
};

export const getTotalLikes = (posts) => {
  return posts.reduce((acc, post) => acc + post.likes, 0);
};

export const sortByPopularity = (posts) => {
  return [...posts].sort((a, b) => b.likes - a.likes);
};

export function useFeed(initialPosts) {
  const posts = ref(initialPosts);
  const searchTag = ref('');

  const filteredPosts = computed(() => {
    return filterByHashtag(posts.value, searchTag.value);
  });

  const totalLikes = computed(() => {
    return getTotalLikes(posts.value);
  });

  const mostLikedPost = computed(() => {
    const sorted = sortByPopularity(posts.value);
    return sorted.length > 0 ? sorted[0] : null;
  });

  const handleLike = (postId) => {
    posts.value = toggleLike(posts.value, postId);
  };

  const handleAddComment = (postId, text) => {
    posts.value = addComment(posts.value, postId, text);
  };

  const setSearchTag = (tag) => {
    searchTag.value = tag;
  };

  return {
    posts,
    filteredPosts,
    totalLikes,
    mostLikedPost,
    searchTag,
    handleLike,
    handleAddComment,
    setSearchTag,
  };
}