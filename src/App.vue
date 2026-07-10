<template>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
</script>

<style>
:root {
  --bg: #0b0f14;
  --bg2: #737373;
  --card: #111826;
  --card-2: #0f1623;
  --border: rgba(255,255,255,0.06);
  --text: #e6e6e6;
  --muted: #9aa4b2;
  --blue: #3b82f6;
  --blue-dark: #2563eb;
  --hover: rgba(255,255,255,0.05);
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Inter, system-ui;
}

</style>