<template>
  <div class="page">
    <AuthCard>
      <div class="icon-circle">
        <i class="ti ti-lock-open" aria-hidden="true"></i>
      </div>

      <div class="screen-title">Crie uma nova senha</div>
      <p class="screen-sub">
        A senha deve ter pelo menos 8 caracteres e incluir letras e números.
      </p>

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
          id="code"
          label="Código de segurança"
          type="text"
          placeholder="000000"
          icon="ti-shield-lock"
          v-model="form.code"
          :hasError="errors.code"
          errorMsg="Informe o código enviado por e-mail."
        />

        <AuthField
          id="new-pass"
          label="Nova senha"
          type="password"
          placeholder="••••••••"
          icon="ti-lock"
          v-model="form.password"
          :hasError="errors.password"
          errorMsg="A senha não atende aos requisitos."
        >
          <div class="requirements">
            <div class="req-item" :class="{ ok: reqs.length }">
              <i :class="reqs.length ? 'ti ti-circle-check' : 'ti ti-circle-x'"></i>
              Mínimo de 8 caracteres
            </div>
            <div class="req-item" :class="{ ok: reqs.cases }">
              <i :class="reqs.cases ? 'ti ti-circle-check' : 'ti ti-circle-x'"></i>
              Letras maiúsculas e minúsculas
            </div>
            <div class="req-item" :class="{ ok: reqs.number }">
              <i :class="reqs.number ? 'ti ti-circle-check' : 'ti ti-circle-x'"></i>
              Pelo menos um número
            </div>
            <div class="req-item" :class="{ ok: reqs.special }">
              <i :class="reqs.special ? 'ti ti-circle-check' : 'ti ti-circle-x'"></i>
              Pelo menos um caractere especial
            </div>
          </div>
        </AuthField>

        <AuthField
          id="confirm-pass"
          label="Confirmar nova senha"
          type="password"
          placeholder="••••••••"
          icon="ti-lock-check"
          v-model="form.confirm"
          :hasError="errors.confirm"
          errorMsg="As senhas não coincidem."
        />
      </form>

      <button class="btn-primary" @click="submit">
        Redefinir senha
      </button>

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
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import AuthCard from '@/components/AuthCard.vue'
import AuthField from '@/components/AuthField.vue'

const router = useRouter()

const form = reactive({ email: '', code: '', password: '', confirm: '' })
const errors = reactive({ email: false, code: false, password: false, confirm: false })

const reqs = computed(() => ({
  length: form.password.length >= 8,
  cases: /[A-Z]/.test(form.password) && /[a-z]/.test(form.password),
  number: /\d/.test(form.password),
  special: /[^A-Za-z0-9]/.test(form.password),
}))

const allReqs = computed(() => Object.values(reqs.value).every(Boolean))

function submit() {
  errors.email = !form.email.includes('@')
  errors.code = form.code.trim().length === 0
  errors.password = !allReqs.value
  errors.confirm = form.password !== form.confirm

  if (!errors.email && !errors.code && !errors.password && !errors.confirm) {
    router.push('/login')
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

.field-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
}

.requirements {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
}

.req-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.78rem;
  color: var(--txt3);
  transition: color 0.2s;
}

.req-item .ti {
  font-size: 15px;
}

.req-item.ok {
  color: var(--success);
}

.req-item.ok .ti {
  color: var(--success);
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
  margin-top: 4px;
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
</style>  