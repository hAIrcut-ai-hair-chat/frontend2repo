<!-- Sidebar.vue -->
<template>
    <div class="sidebar">
        <div class="sidebar-section">
            <div class="sidebar-title">Sobre</div>
            <div class="about-row"><i class="ti ti-map-pin" aria-hidden="true"></i> {{ user.location }}</div>
            <div class="about-row"><i class="ti ti-calendar" aria-hidden="true"></i> Membro desde {{ user.memberSince }}
            </div>
            <div class="about-row"><i class="ti ti-world" aria-hidden="true"></i> <a :href="user.website"
                    target="_blank">{{ user.website }}</a></div>
            <div class="about-row"><i class="ti ti-brand-dribbble" aria-hidden="true"></i> <a
                    href="#">dribbble.com/joao</a></div>
            <div class="about-row"><i class="ti ti-brand-github" aria-hidden="true"></i> <a href="#">github.com/joao</a>
            </div>
        </div>

        <div class="sidebar-section">
            <div class="sidebar-title">Habilidades</div>
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

        <div class="sidebar-section">
            <div class="sidebar-title">Atividade recente</div>
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
    user: Object,
    skills: Array,
    activities: Array,
})
</script>

<style scoped>
.sidebar {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.sidebar-title {
    font-size: .72rem;
    font-weight: 600;
    letter-spacing: .07em;
    text-transform: uppercase;
    color: var(--txt3);
    margin-bottom: 12px;
}

.about-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: .83rem;
    color: var(--txt2);
    margin-bottom: 8px;
}

.about-row i {
    font-size: 16px;
    color: var(--txt3);
    flex-shrink: 0;
}

.about-row a {
    color: var(--accent);
    text-decoration: none;
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