<!-- Topbar.vue -->
<template>
    <div class="topbar">
        <div class="topbar-left">
            <div class="logo-mark">N</div>
            <span class="logo-name">Nova</span>
        </div>
        <nav class="topbar-nav">
            <a v-for="item in navItems" :key="item" :class="{ active: item === activeNav }" @click="activeNav = item">{{
                item }}</a>
        </nav>
        <div class="topbar-right">
            <div class="topbar-icon"><i class="ti ti-mail" aria-hidden="true"></i></div>
            <div class="topbar-icon">
                <i class="ti ti-bell" aria-hidden="true"></i>
                <div class="notif-dot"></div>
            </div>
            <button class="btn-upload-top">
                <i class="ti ti-upload" aria-hidden="true"></i>
                Publicar
            </button>
            <div class="avatar-top">JD</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const navItems = ['Designers', 'Explorar', 'Projetos', 'Work']
const activeNav = ref('Designers')
</script>

<style scoped>
.topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    background: rgba(8, 8, 9, 0.9);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 10;
}

.topbar-left {
    display: flex;
    align-items: center;
    gap: 9px;
}

.logo-mark {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
}

.logo-name {
    font-size: .95rem;
    font-weight: 600;
    color: var(--txt);
    letter-spacing: -.3px;
}

.topbar-nav {
    display: flex;
    gap: 4px;
}

.topbar-nav a {
    padding: 6px 14px;
    border-radius: 20px;
    font-size: .82rem;
    color: var(--txt2);
    text-decoration: none;
    transition: color .15s, background .15s;
    cursor: pointer;
}

.topbar-nav a:hover {
    color: var(--txt);
    background: var(--card2);
}

.topbar-nav a.active {
    color: var(--txt);
    background: var(--card2);
}

.topbar-right {
    display: flex;
    align-items: center;
    gap: 10px;
}

.topbar-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background .15s;
    position: relative;
}

.topbar-icon:hover {
    background: var(--card2);
}

.topbar-icon i {
    font-size: 18px;
    color: var(--txt2);
}

.notif-dot {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #f87171;
    border: 1.5px solid var(--bg);
}

.btn-upload-top {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 16px;
    border-radius: 20px;
    background: var(--accent);
    border: none;
    color: #03122e;
    font-family: var(--font);
    font-size: .8rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity .15s;
}

.btn-upload-top:hover {
    opacity: .88;
}

.btn-upload-top i {
    font-size: 16px;
}

.avatar-top {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
}
</style>