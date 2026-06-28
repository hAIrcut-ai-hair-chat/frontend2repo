<template>
  <AuthCard>
    <div class="screen-title">Bem-vindo de volta</div>
    <p class="screen-sub">Entre na sua conta para continuar.</p>

    <form class="field-group" @submit.prevent="submit">
      <AuthField
        id="email"
        label="E-mail"
        type="email"
        placeholder="voce@exemplo.com"
        icon="ti-mail"
        v-model="form.email"
        :hasError="errors.email"
        errorMsg="Informe um e-mail válido."
      />
      <AuthField
        id="password"
        label="Senha"
        type="password"
        placeholder="••••••••"
        icon="ti-lock"
        v-model="form.password"
        :hasError="errors.password"
        errorMsg="Informe sua senha."
      />
    </form>

    <div class="row-between">
      <label class="remember">
        <input type="checkbox" v-model="form.remember" />
        <span>Lembrar de mim</span>
      </label>
      <router-link to="/recuperar-senha" class="link">Esqueceu a senha?</router-link>
    </div>

    <button class="btn-primary" @click="submit">Entrar</button>

    <div class="divider">
      <div class="divider-line"></div>
      <span>ou continue com</span>
      <div class="divider-line"></div>
    </div>

    <button class="btn-social" type="button">
      <i class="ti ti-brand-google" aria-hidden="true"></i>
      Entrar com Google
    </button>
    <button class="btn-social" type="button">
      <i class="ti ti-brand-github" aria-hidden="true"></i>
      Entrar com GitHub
    </button>

    <div class="bottom-text">
      Não tem uma conta?
      <router-link to="/criar-conta" class="link">Criar conta</router-link>
    </div>
  </AuthCard>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import AuthCard from '@/components/AuthCard.vue'
import AuthField from '@/components/AuthField.vue'

const router = useRouter()

const form = reactive({ email: '', password: '', remember: false })
const errors = reactive({ email: false, password: false })

function submit() {
  errors.email = !form.email.includes('@')
  errors.password = form.password.length < 1
  if (!errors.email && !errors.password) {
    router.push('/')
  }
}
</script>

<style scoped>
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
  margin-bottom: 28px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
}

.row-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.remember {
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
}

.remember input[type='checkbox'] {
  width: 15px;
  height: 15px;
  accent-color: var(--accent);
  cursor: pointer;
}

.remember span {
  font-size: 0.8rem;
  color: var(--txt2);
}

.link {
  font-size: 0.8rem;
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.15s;
}

.link:hover {
  opacity: 0.75;
}

.btn-primary {
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
  transition: opacity 0.15s, transform 0.1s;
  margin-bottom: 16px;
  letter-spacing: -0.1px;
}

.btn-primary:hover {
  opacity: 0.88;
}

.btn-primary:active {
  transform: scale(0.98);
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.divider-line {
  flex: 1;
  height: 0.5px;
  background: var(--border2);
}

.divider span {
  font-size: 0.75rem;
  color: var(--txt3);
  white-space: nowrap;
}

.btn-social {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 11px;
  border-radius: var(--r);
  background: transparent;
  border: 1px solid var(--border2);
  color: var(--txt);
  font-family: var(--font);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
  margin-bottom: 10px;
}

.btn-social:hover {
  background: var(--card2);
}

.btn-social .ti {
  font-size: 18px;
  color: var(--txt2);
}

.bottom-text {
  text-align: center;
  font-size: 0.82rem;
  color: var(--txt3);
  margin-top: 20px;
}
</style>