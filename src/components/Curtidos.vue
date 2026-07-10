<template>
    <div class="sobre-area">
        <div class="sobre-section">
            <h3 class="sobre-title">Biografia</h3>
            <p class="sobre-bio">{{ user.bio || 'Nenhuma biografia fornecida.' }}</p>
        </div>

        <div class="sobre-section">
            <h3 class="sobre-title">Informações</h3>
            <div class="info-grid">
                <div class="info-item" v-if="user.location">
                    <i class="ti ti-map-pin" aria-hidden="true"></i>
                    <span>{{ user.location }}</span>
                </div>
                <div class="info-item">
                    <i class="ti ti-calendar" aria-hidden="true"></i>
                    <span>Membro desde {{ user.memberSince || 'data não informada' }}</span>
                </div>
                <div class="info-item" v-if="user.website">
                    <i class="ti ti-world" aria-hidden="true"></i>
                    <a :href="user.website" target="_blank">{{ user.website }}</a>
                </div>
                <div class="info-item">
                    <i class="ti ti-mail" aria-hidden="true"></i>
                    <span>{{ user.email || 'email não informado' }}</span>
                </div>
            </div>
        </div>

        <div class="sobre-section">
            <h3 class="sobre-title">Redes Sociais</h3>
            <div class="social-links">
                <a href="#" class="social-link"><i class="ti ti-brand-dribbble"></i> Dribbble</a>
                <a href="#" class="social-link"><i class="ti ti-brand-github"></i> GitHub</a>
                <a href="#" class="social-link"><i class="ti ti-brand-twitter"></i> Twitter</a>
                <a href="#" class="social-link"><i class="ti ti-brand-linkedin"></i> LinkedIn</a>
            </div>
        </div>

        <div class="sobre-section">
            <h3 class="sobre-title">Habilidades</h3>
            <div class="skills-wrap">
                <span v-for="skill in skills" :key="skill" class="skill-tag" :class="{
                    'skill-blue': ['UI Design', 'Vue.js', 'CSS', 'React'].includes(skill),
                    'skill-purple': ['Figma', 'TypeScript'].includes(skill),
                    'skill-pink': ['Branding', 'Illustrator'].includes(skill)
                }">
                    {{ skill }}
                </span>
            </div>
        </div>

        <div class="sobre-section">
            <h3 class="sobre-title">Atividade Recente</h3>
            <div v-for="act in activities" :key="act.title" class="activity-row">
                <div class="act-icon"><i :class="`ti ${act.icon}`" aria-hidden="true"></i></div>
                <div class="act-info">
                    <div class="act-title">{{ act.title }}</div>
                    <div class="act-time">{{ act.time }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    user: {
        type: Object,
        default: () => ({})
    },
    skills: {
        type: Array,
        default: () => []
    },
    activities: {
        type: Array,
        default: () => []
    }
})
</script>

<style scoped>
.sobre-area {
    padding: 24px;
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 28px;
}

.sobre-title {
    font-size: .82rem;
    font-weight: 600;
    letter-spacing: .05em;
    text-transform: uppercase;
    color: var(--txt3);
    margin-bottom: 14px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 8px;
}

.sobre-bio {
    font-size: .95rem;
    line-height: 1.7;
    color: var(--txt2);
    max-width: 80%;
}

.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: .85rem;
    color: var(--txt2);
}

.info-item i {
    font-size: 16px;
    color: var(--txt3);
    flex-shrink: 0;
}

.info-item a {
    color: var(--accent);
    text-decoration: none;
}

.social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.social-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    border-radius: 20px;
    border: 1px solid var(--border2);
    color: var(--txt2);
    text-decoration: none;
    font-size: .8rem;
    transition: all .15s;
}

.social-link:hover {
    background: var(--card2);
    color: var(--txt);
    border-color: var(--border2);
}

.social-link i {
    font-size: 16px;
}

.skills-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.skill-tag {
    font-size: .72rem;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 20px;
    border: 1px solid;
    letter-spacing: .02em;
}

.skill-blue {
    color: var(--accent);
    border-color: rgba(124, 158, 255, .2);
    background: rgba(124, 158, 255, .07);
}

.skill-purple {
    color: var(--accent2);
    border-color: rgba(167, 139, 250, .2);
    background: rgba(167, 139, 250, .07);
}

.skill-pink {
    color: var(--rose);
    border-color: rgba(244, 114, 182, .2);
    background: rgba(244, 114, 182, .07);
}

.activity-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid var(--border);
}

.activity-row:last-child {
    border-bottom: none;
}

.act-icon {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: rgba(124, 158, 255, .1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.act-icon i {
    font-size: 15px;
    color: var(--accent);
}

.act-info {
    flex: 1;
}

.act-title {
    font-size: .8rem;
    color: var(--txt);
}

.act-time {
    font-size: .7rem;
    color: var(--txt3);
}
</style>