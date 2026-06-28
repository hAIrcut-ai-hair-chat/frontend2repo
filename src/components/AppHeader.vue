<template>
  <header class="hdr">
    <div class="hdr-left">
      <div class="ti ti-cube"></div>
      <span class="brand">Geekours</span>
    </div>

    <div class="search">
      <i class="ti ti-search"></i>
      <input type="text" placeholder="Buscar pessoas, tópicos..." v-model="query" />
    </div>

    <div class="hdr-right">
      <div class="icon-btn">
        <i class="ti ti-message-2"></i>
      </div>
      <div class="icon-btn">
        <i class="ti ti-bell"></i>
        <div class="notif-dot"></div>
      </div>
      <div class="avatar-sm">JD</div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const query = ref('')
</script>

<style scoped>
.hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 22px;
  background: rgba(8, 8, 9, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
}

.hdr-left {
  display: flex;
  align-items: center;
  gap: 9px;
}

.logo-mark {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: linear-gradient(135deg, #7c9eff 0%, #a78bfa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #fff;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.brand {
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.4px;
  color: var(--txt);
}

.search {
  display: flex;
  align-items: center;
  background: var(--card2);
  border: 1px solid var(--border2);
  border-radius: 40px;
  padding: 0 14px;
  gap: 8px;
  flex: 0 1 280px;
  transition: border-color 0.2s, background 0.2s;
}

.search:focus-within {
  border-color: #3a3a46;
  background: #181820;
}

.search .ti {
  color: var(--txt3);
  font-size: 18px;
}

.search input {
  background: transparent;
  border: none;
  outline: none;
  color: var(--txt);
  font-family: var(--font);
  font-size: 0.85rem;
  font-weight: 300;
  padding: 9px 0;
  width: 100%;
}

.search input::placeholder {
  color: var(--txt3);
}

.hdr-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.icon-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
}

.icon-btn:hover {
  background: var(--card2);
}

.icon-btn .ti {
  color: var(--txt2);
  font-size: 20px;
}

.notif-dot {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #f87171;
  border: 2px solid var(--bg);
}

.avatar-sm {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
}
</style>
