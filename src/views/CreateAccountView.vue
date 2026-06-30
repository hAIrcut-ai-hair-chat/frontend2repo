<template>
  <div class="page">
    <AuthCard>
      <div class="screen-title">Crie sua conta</div>
      <p class="screen-sub">Leva menos de 1 minutos para começar</p>

      <form class="field-group" @submit.prevent="submit">
        <AuthField id="nome" label="Nome" placeholder="Potássio" icon="ti-user" v-model="form.nome"
          :hasError="errors.nome" errorMsg="Informe seu nome." />

        <AuthField id="email" label="E-mail" type="email" placeholder="potassio@potassio.com" icon="ti-mail"
          v-model="form.email" :hasError="errors.email" errorMsg="Informe um e-mail válido." />

        <AuthField id="password" label="Senha" type="password" placeholder="Mínimo de 8 caracteres" icon="ti-lock"
          v-model="form.password" :hasError="errors.password" errorMsg="A senha deve ter pelo menos 8 caracteres.">
          <div class="password-strength">
            <div class="strength-bars">
              <div v-for="i in 4" :key="i" class="bar" :class="barClass(i)"></div>
            </div>
            <span class="strength-label">Força: {{ strengthLabel }}</span>
          </div>
        </AuthField>

        <AuthField id="confirm" label="Confirmar senha" type="password" placeholder="Repita a senha"
          icon="ti-lock-check" v-model="form.confirm" :hasError="errors.confirm" errorMsg="As senhas não coincidem." />
      </form>

      <p class="terms">
        Ao criar uma conta, você concorda com os
        <a class="link" tabindex="0">Termos de uso</a> e a
        <a class="link" tabindex="0">Política de privacidade</a>.
      </p>

      <button class="btn-primary" @click="submit">Criar conta</button>

      <div class="divider">
        <div class="divider-line"></div>
        <span>ou</span>
        <div class="divider-line"></div>
      </div>

      <button class="btn-social" type="button">
        <i class="ti ti-brand-google" aria-hidden="true"></i>
        Continuar com Google
      </button>
      <button class="btn-social" type="button">
        <i class="ti ti-brand-github" aria-hidden="true"></i>
        Entrar com GitHub
      </button>

      <div class="bottom-text">
        Já tem uma conta?
        <router-link to="/login" class="link">Entrar</router-link>
      </div>
    </AuthCard>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthCard from '@/components/AuthCard.vue'
import AuthField from '@/components/AuthField.vue'

const router = useRouter()

const form = reactive({
  nome: '',
  email: '',
  password: '',
  confirm: ''
})

const errors = reactive({
  nome: false,
  email: false,
  password: false,
  confirm: false
})

const strengthScore = computed(() => {
  const p = form.password
  if (!p) return 0
  let s = 0
  if (p.length >= 8) s++
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++
  if (/\d/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})

const strengthLabel = computed(() => {
  const labels = ['', 'fraca', 'média', 'boa', 'forte']
  return labels[strengthScore.value] || ''
})

function barClass(i) {
  if (i > strengthScore.value) return ''
  if (strengthScore.value <= 2) return 'filled'
  return 'strong'
}

function submit() {
  errors.nome = !form.nome.trim()
  errors.email = !form.email.includes('@')
  errors.password = form.password.length < 8
  errors.confirm = form.password !== form.confirm

  if (Object.values(errors).every(v => !v)) {
    router.push('/login')
  }
}

const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type != password) {
    return props.type
  }
  return showPassword.value ? 'text' : 'password'
})

</script>

<style scoped>
.page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin-bottom: 28px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 16px;
}

.password-strength {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 6px;
}

.strength-bars {
  display: flex;
  gap: 4px;
}

.bar {
  height: 3px;
  flex: 1;
  border-radius: 4px;
  background: var(--border2);
  transition: background 0.2s;
}

.bar.filled {
  background: var(--accent);
}

.bar.strong {
  background: var(--success, #00b894);
}

.strength-label {
  font-size: 0.72rem;
  color: var(--txt3);
}

.terms {
  font-size: 0.76rem;
  color: var(--txt3);
  text-align: center;
  line-height: 1.55;
  margin-bottom: 16px;
}

.link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
  font-size: inherit;
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