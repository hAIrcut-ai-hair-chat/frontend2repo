<!-- Hero.vue -->
<template>
    <div class="hero">
        <div class="hero-avatar-col">
            <div class="avatar-ring">
                <div class="avatar-inner">
                    <img v-if="user.avatarUrl" :src="user.avatarUrl" :alt="user.name" />
                    <span v-else>{{ initials }}</span>
                </div>
                <div class="avatar-cam" aria-label="Alterar foto">
                    <i class="ti ti-camera" aria-hidden="true"></i>
                </div>
            </div>
        </div>

        <div class="hero-info">
            <div class="info-row">
                <div class="hero-name">{{ user.name }}</div>
                <div class="badge-pro"><i class="ti ti-bolt" aria-hidden="true"></i>PRO</div>
            </div>
            <div class="hero-title">{{ user.bio }}</div>

            <div class="collaborators">
                <div class="collab-avatars">
                    <div class="collab-av" style="background:linear-gradient(135deg,#7c9eff,#a78bfa)">AM</div>
                    <div class="collab-av" style="background:linear-gradient(135deg,#f472b6,#a78bfa)">CS</div>
                    <div class="collab-av" style="background:linear-gradient(135deg,#34d399,#7c9eff)">PK</div>
                    <div class="collab-av" style="background:linear-gradient(135deg,#fbbf24,#f472b6)">LR</div>
                </div>
                <span class="collab-text">Seguido por Ana, Carlos e mais 48</span>
            </div>

            <div class="action-btns">
                <button class="btn-follow">Seguir</button>
                <button class="btn-contact">Enviar mensagem</button>
            </div>
        </div>

        <div class="hero-actions">
            <div class="hero-stats">
                <div v-for="stat in stats" :key="stat.label" class="stat">
                    <div class="stat-label">{{ stat.label }}</div>
                    <div class="stat-num">{{ stat.value }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    user: Object,
    stats: Array,
})

const initials = computed(() => {
    const parts = props.user.name.split(' ')
    return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
})
</script>

<style scoped>
.hero {
    display: grid;
    grid-template-columns: 200px 1fr auto;
    gap: 0;
    padding: 0 40px;
    align-items: flex-end;
    margin-top: -80px;
    position: relative;
    z-index: 2;
}

.hero-avatar-col {
    padding-bottom: 20px;
}

.avatar-ring {
    width: 160px;
    height: 160px;
    border-radius: 24px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    padding: 3px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    position: relative;
}

.avatar-inner {
    width: 100%;
    height: 100%;
    border-radius: 22px;
    background: var(--card2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: -2px;
    overflow: hidden;
}

.avatar-inner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 22px;
}

.avatar-cam {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--card);
    border: 2px solid var(--border2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background .15s, border-color .15s;
    z-index: 3;
}

.avatar-cam:hover {
    background: var(--card2);
    border-color: var(--accent);
}

.avatar-cam i {
    font-size: 14px;
    color: var(--txt2);
}

.hero-info {
    padding: 20px 32px 20px 24px;
    align-self: flex-end;
}

.info-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 6px;
}

.hero-name {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--txt);
    letter-spacing: -.5px;
    line-height: 1.1;
}

.badge-pro {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: .7rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 20px;
    background: rgba(124, 158, 255, 0.15);
    color: var(--accent);
    border: 1px solid rgba(124, 158, 255, 0.25);
    letter-spacing: .04em;
    text-transform: uppercase;
}

.badge-pro i {
    font-size: 12px;
}

.hero-title {
    font-size: .9rem;
    color: var(--txt2);
    margin-bottom: 16px;
    line-height: 1.5;
}

.collaborators {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
}

.collab-avatars {
    display: flex;
}

.collab-av {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 2px solid var(--card);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    font-weight: 600;
    color: #fff;
    margin-left: -8px;
}

.collab-av:first-child {
    margin-left: 0;
}

.collab-text {
    font-size: .78rem;
    color: var(--txt3);
}

.hero-actions {
    padding: 20px 0 20px 0;
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
}

.action-btns {
    display: flex;
    gap: 10px;
}

.btn-follow {
    padding: 9px 24px;
    border-radius: 20px;
    background: var(--txt);
    border: none;
    color: var(--bg);
    font-family: var(--font);
    font-size: .875rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity .15s;
}

.btn-follow:hover {
    opacity: .85;
}

.btn-contact {
    padding: 9px 24px;
    border-radius: 20px;
    background: transparent;
    border: 1px solid var(--border2);
    color: var(--txt);
    font-family: var(--font);
    font-size: .875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background .15s, border-color .15s;
}

.btn-contact:hover {
    background: var(--card2);
    border-color: var(--border2);
}

.hero-stats {
    display: flex;
    gap: 28px;
}

.stat {
    text-align: right;
}

.stat-label {
    font-size: .72rem;
    color: var(--txt3);
    text-transform: uppercase;
    letter-spacing: .05em;
    margin-bottom: 2px;
}

.stat-num {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--txt);
    letter-spacing: -.4px;
}
</style>