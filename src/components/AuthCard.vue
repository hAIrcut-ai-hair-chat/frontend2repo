<template>
  <div class="auth-card">
    <div class="logo-wrap">
      <div class="ti ti-cube"></div>
      <span class="logo-name">Geekours</span>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.auth-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 40px 36px;
  width: 100%;
  max-width: 420px;
}

.logo-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 32px;
}

.logo-mark {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.5px;
  flex-shrink: 0;
}

.logo-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--txt);
  letter-spacing: -0.3px;
}
</style>