<!-- Cover.vue -->
<template>
    <div class="cover">
        <div class="cover-mesh"></div>
        <div class="cover-glow"></div>
    </div>
</template>

<style scoped>
.cover {
    height: 200px;
    background: linear-gradient(145deg, #08081a 0%, #10102a 40%, #0d0d20 100%);
    position: relative;
    overflow: hidden;
}

.cover-mesh {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(124, 158, 255, 0.07) 1px, transparent 1px);
    background-size: 28px 28px;
}

.cover-glow {
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 300px;
    background: radial-gradient(ellipse, rgba(124, 158, 255, 0.12) 0%, transparent 70%);
    pointer-events: none;
}
</style>