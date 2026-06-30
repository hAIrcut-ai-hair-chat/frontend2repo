<template>
  <div class="page">
    <AuthCard>
      <div class="icon-circle">
        <i class="ti ti-mail-forward" aria-hidden="true"></i>
      </div>

      <div class="screen-title">Esqueceu sua senha?</div>
      <p class="screen-sub">
        Digite seu e-mail e enviaremos um link para redefinir sua senha.
      </p>

      <Transition name="fade">
        <div v-if="sent" class="success-box">
          <i class="ti ti-circle-check" aria-hidden="true"></i>
          <p>E-mail enviado. Verifique sua caixa de entrada e a pasta de spam.</p>
        </div>
      </Transition>

      <form v-if="!sent" class="field-group" @submit.prevent="submit">
        <AuthField id="email" label="E-mail cadastrado" type="email" placeholder="voce@exemplo.com" icon="ti-mail"
          v-model="email" :hasError="hasError" errorMsg="Informe um e-mail válido." />
      </form>

      <button v-if="!sent" class="btn-primary" @click="submit">
        Enviar link de redefinição
      </button>

      <router-link v-if="sent" to="/redefinir-senha" class="btn-primary btn-primary--link">
        Já tenho o código
      </router-link>

      <div class="bottom-link">
        <router-link to="/login" class="link">
          <i class="ti ti-arrow-left" aria-hidden="true"></i>
          Voltar ao login
        </router-link>
      </div>
    </AuthCard>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AuthCard from '@/components/AuthCard.vue'
import AuthField from '@/components/AuthField.vue'

const email = ref('')
const hasError = ref(false)
const sent = ref(false)

function submit() {
  hasError.value = !email.value.includes('@')
  if (!hasError.value) {
    sent.value = true
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(124, 158, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.icon-circle .ti {
  font-size: 26px;
  color: var(--accent);
}

.screen-title {
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--txt);
  letter-spacing: -0.4px;
  margin-bottom: 6px;
  line-height: 1.3;
}

.screen-sub {
  font-size: 0.875rem;
  color: var(--txt2);
  line-height: 1.55;
  margin-bottom: 24px;
}

.success-box {
  background: var(--success-bg);
  border: 1px solid var(--success-border);
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
}

.success-box .ti {
  color: var(--success);
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 1px;
}

.success-box p {
  font-size: 0.83rem;
  color: var(--success);
  line-height: 1.5;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
}

.btn-primary {
  display: block;
  width: 100%;
  padding: 12px;
  border-radius: var(--r);
  background: var(--accent);
  border: none;
  color: #03122e;
  font-family: var(--font);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: opacity 0.15s, transform 0.1s;
  margin-bottom: 4px;
  margin-top: 8px;
}

.btn-primary:hover {
  opacity: 0.88;
}

.btn-primary:active {
  transform: scale(0.98);
}

.bottom-link {
  text-align: center;
  margin-top: 20px;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.82rem;
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.15s;
}

.link:hover {
  opacity: 0.75;
}

.link .ti {
  font-size: 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>