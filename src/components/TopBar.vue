<template>
    <div class="topbar">
        <!-- Logo à esquerda -->
        <div class="topbar-left">
            <div class="ti ti-cube"></div>
            <span class="logo-name">Geekours</span>
        </div>
        <div class="topbar-center">
            <SearchBar v-model="searchQuery" placeholder="Pesquisar no feed..." @update:model-value="onSearch" />
        </div>

        <div class="topbar-right">
            <div class="topbar-icon"><i class="ti ti-mail" aria-hidden="true"></i></div>
            <div class="topbar-icon">
                <i class="ti ti-bell" aria-hidden="true"></i>
                <div class="notif-dot"></div>
            </div>
            <div class="topbar-icon">
                <i class="ti ti-home"></i>
            </div>
            <div class="topbar-icon">
                <i class="ti ti-download"></i>
            </div>
            <div class=""></div>
            <button class="btn-upload-top">
                <i class="ti ti-plus" aria-hidden="true"></i>
                Publicar
            </button>
            <div class="avatar-top">JD</div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import SearchBar from './SearchBar.vue'

const router = useRouter()
const route = useRoute()

const navItems = ['Feed', 'Salvos']
const searchQuery = ref('')

// Emite a consulta de pesquisa para o pai
const emit = defineEmits(['search'])

function onSearch(query) {
    emit('search', query)
}

// Opcional: redireciona se a rota mudar (já feito pelo router-link)
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
    gap: 16px;
}

/* Esquerda */
.topbar-left {
    display: flex;
    align-items: center;
    gap: 9px;
    flex-shrink: 0;
}

.logo-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--txt);
    letter-spacing: -0.3px;
}

/* Centro - ocupa espaço restante e centraliza conteúdo */
.topbar-center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    min-width: 0;
    /* evita overflow */
}

/* Navegação */
.topbar-nav {
    display: flex;
    gap: 4px;
    flex-shrink: 0;
}

.nav-link {
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.82rem;
    color: var(--txt2);
    text-decoration: none;
    transition: color 0.15s, background 0.15s;
    cursor: pointer;
}

.nav-link:hover {
    color: var(--txt);
    background: var(--card2);
}

.nav-link.active {
    color: var(--txt);
    background: var(--card2);
}

/* Barra de pesquisa - largura fixa, mas pode ajustar */
.search-bar {
    flex-shrink: 1;
    min-width: 180px;
    max-width: 280px;
}

/* Direita */
.topbar-right {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
}

.topbar-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s;
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
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s;
}

.btn-upload-top:hover {
    opacity: 0.88;
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

/* Responsivo */
@media (max-width: 860px) {
    .topbar {
        flex-wrap: wrap;
        gap: 8px;
    }

    .topbar-center {
        order: 10;
        flex: 1 1 100%;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
    }

    .topbar-nav {
        flex-wrap: wrap;
        justify-content: center;
    }

    .search-bar {
        min-width: 100%;
        max-width: 100%;
    }

    .topbar-right {
        order: 2;
        margin-left: auto;
    }
}
</style>