<template>
  <div class="page">
    <div class="card">
      <div class="settings-layout">

        <nav class="settings-nav">
          <div class="snav-section">Conta</div>
          <div
            v-for="item in navItems"
            :key="item.key"
            class="snav-item"
            :class="{ active: activeSection === item.key, danger: item.danger }"
            @click="item.danger ? handleLogout() : (activeSection = item.key)"
          >
            <i :class="`ti ${item.icon}`" aria-hidden="true"></i>
            {{ item.label }}
          </div>
          <div class="snav-section">Preferências</div>
          <div
            v-for="item in navPrefs"
            :key="item.key"
            class="snav-item"
            :class="{ active: activeSection === item.key }"
            @click="activeSection = item.key"
          >
            <i :class="`ti ${item.icon}`" aria-hidden="true"></i>
            {{ item.label }}
          </div>
          <div class="snav-section">Suporte</div>
          <div
            v-for="item in navSupport"
            :key="item.key"
            class="snav-item"
            :class="{ active: activeSection === item.key, danger: item.danger }"
            @click="item.danger ? handleLogout() : (activeSection = item.key)"
          >
            <i :class="`ti ${item.icon}`" aria-hidden="true"></i>
            {{ item.label }}
          </div>
        </nav>

        <div class="settings-content">

          <div>
            <div class="section-hdr">
              <h3>Foto de perfil</h3>
              <p>Formatos aceitos: JPG, PNG ou GIF. Tamanho máximo: 5 MB.</p>
            </div>
            <div class="avatar-upload-block">
              <div class="big-avatar">
                <div class="big-avatar-inner">
                  <img v-if="avatarPreview" :src="avatarPreview" alt="Foto de perfil" />
                  <span v-else>{{ initials }}</span>
                </div>
              </div>
              <div class="avatar-upload-info">
                <p>Escolha uma foto que represente você. Ela ficará visível para outros usuários.</p>
                <div class="avatar-btns">
                  <button class="btn-upload" @click="triggerFileInput">
                    <i class="ti ti-upload" aria-hidden="true"></i>
                    Enviar foto
                  </button>
                  <button class="btn-remove" @click="removeAvatar" :disabled="!avatarPreview">
                    <i class="ti ti-trash" aria-hidden="true"></i>
                    Remover
                  </button>
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    style="display:none"
                    @change="handleAvatarChange"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="section-divider"></div>

          <div>
            <div class="section-hdr">
              <h3>Informações pessoais</h3>
              <p>Atualize seu nome e bio visíveis no perfil.</p>
            </div>
            <div class="fields-col">
              <div class="fields-grid">
                <SettingsField
                  id="s-nome"
                  label="Nome"
                  placeholder="João"
                  icon="ti-user"
                  v-model="form.nome"
                />
                <SettingsField
                  id="s-sobrenome"
                  label="Sobrenome"
                  placeholder="Silva"
                  v-model="form.sobrenome"
                />
              </div>
              <SettingsField
                id="s-handle"
                label="Usuário"
                placeholder="seuusuario"
                icon="ti-at"
                v-model="form.handle"
                :hint="`nova.app/@${form.handle}`"
              />
              <SettingsField
                id="s-bio"
                label="Bio"
                placeholder="Conte um pouco sobre você..."
                v-model="form.bio"
                :multiline="true"
                :rows="3"
                :maxlength="160"
                :hint="`${form.bio.length} / 160 caracteres`"
              />
            </div>
          </div>

          <div class="section-divider"></div>

          <!-- E-MAIL -->
          <div>
            <div class="section-hdr">
              <h3>Endereço de e-mail</h3>
              <p>Seu e-mail é usado para login e notificações.</p>
            </div>
            <SettingsField
              id="s-email"
              label="E-mail"
              type="email"
              placeholder="voce@exemplo.com"
              icon="ti-mail"
              v-model="form.email"
            />
          </div>

          <div class="section-divider"></div>

          <!-- SENHA -->
          <div>
            <div class="section-hdr">
              <h3>Alterar senha</h3>
              <p>Use uma senha forte que você não utilize em outros serviços.</p>
            </div>
            <div class="fields-col">
              <SettingsField
                id="s-pass-cur"
                label="Senha atual"
                type="password"
                placeholder="••••••••"
                icon="ti-lock"
                v-model="form.currentPass"
              />
              <div class="fields-grid">
                <SettingsField
                  id="s-pass-new"
                  label="Nova senha"
                  type="password"
                  placeholder="••••••••"
                  icon="ti-lock-plus"
                  v-model="form.newPass"
                />
                <SettingsField
                  id="s-pass-con"
                  label="Confirmar nova senha"
                  type="password"
                  placeholder="••••••••"
                  icon="ti-lock-check"
                  v-model="form.confirmPass"
                />
              </div>
              <p v-if="passError" class="pass-error">{{ passError }}</p>
            </div>
          </div>

          <div class="section-divider"></div>

          <!-- ZONA DE PERIGO -->
          <div>
            <div class="section-hdr">
              <h3>Zona de perigo</h3>
              <p>Ações irreversíveis relacionadas à sua conta.</p>
            </div>
            <div class="danger-zone">
              <div class="danger-info">
                <p class="danger-title">Excluir conta</p>
                <p class="danger-sub">Remove permanentemente sua conta e todos os seus dados. Esta ação não pode ser desfeita.</p>
              </div>
              <button class="btn-danger">Excluir conta</button>
            </div>
          </div>

          <!-- SALVAR -->
          <div class="save-row">
            <router-link to="/perfil" class="btn-cancel">Cancelar</router-link>
            <button class="btn-save" @click="save">Salvar alterações</button>
          </div>

        </div>
      </div>
    </div>

    <Toast v-model="showToast" message="Alterações salvas com sucesso." />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import SettingsField from '@/components/SettingsField.vue'
import Toast from '@/components/Toast.vue'

const router = useRouter()

const navItems = [
  { key: 'perfil', label: 'Perfil', icon: 'ti-user' },
  { key: 'seguranca', label: 'Segurança', icon: 'ti-lock' },
  { key: 'email', label: 'E-mail', icon: 'ti-mail' },
]

const navPrefs = [
  { key: 'notificacoes', label: 'Notificações', icon: 'ti-bell' },
  { key: 'aparencia', label: 'Aparência', icon: 'ti-moon' },
  { key: 'privacidade', label: 'Privacidade', icon: 'ti-shield' },
]

const navSupport = [
  { key: 'ajuda', label: 'Ajuda', icon: 'ti-help' },
  { key: 'sair', label: 'Sair', icon: 'ti-logout', danger: true },
]

const activeSection = ref('perfil')
const showToast = ref(false)
const fileInput = ref(null)
const avatarPreview = ref('')
const passError = ref('')

const form = ref({
  nome: 'João',
  sobrenome: 'Dasilva',
  handle: 'joaodasilva',
  bio: 'Designer & desenvolvedor front-end. Apaixonado por interfaces limpas e experiências que fazem sentido.',
  email: 'joao@exemplo.com',
  currentPass: '',
  newPass: '',
  confirmPass: '',
})

const initials = computed(() => {
  const n = form.value.nome?.[0] ?? ''
  const s = form.value.sobrenome?.[0] ?? ''
  return (n + s).toUpperCase()
})

function triggerFileInput() {
  fileInput.value?.click()
}

function handleAvatarChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    avatarPreview.value = ev.target.result
  }
  reader.readAsDataURL(file)
}

function removeAvatar() {
  avatarPreview.value = ''
  if (fileInput.value) fileInput.value.value = ''
}

function save() {
  passError.value = ''
  if (form.value.newPass && form.value.newPass !== form.value.confirmPass) {
    passError.value = 'As novas senhas não coincidem.'
    return
  }
  showToast.value = true
}

function handleLogout() {
  router.push('/login')
}
</script>

<style scoped>
.page {
  width: 100%;
  max-width: 860px;
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
}

.settings-layout {
  display: grid;
  grid-template-columns: 185px 1fr;
}

.settings-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 16px 12px;
  border-right: 1px solid var(--border);
}

.snav-section {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--txt3);
  padding: 12px 8px 4px;
}

.snav-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 10px;
  border-radius: 9px;
  cursor: pointer;
  font-size: 0.83rem;
  color: var(--txt2);
  transition: background 0.15s, color 0.15s;
}

.snav-item:hover {
  background: var(--card2);
  color: var(--txt);
}

.snav-item.active {
  background: var(--card2);
  color: var(--txt);
}

.snav-item.danger {
  color: var(--danger);
}

.snav-item .ti {
  font-size: 18px;
}

.settings-content {
  padding: 24px 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.section-hdr {
  margin-bottom: 14px;
}

.section-hdr h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--txt);
  margin-bottom: 3px;
}

.section-hdr p {
  font-size: 0.8rem;
  color: var(--txt3);
  line-height: 1.5;
}

.avatar-upload-block {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px;
  background: var(--card2);
  border-radius: var(--r);
  border: 1px solid var(--border);
}

.big-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  padding: 2.5px;
  flex-shrink: 0;
}

.big-avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--card);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: -1px;
  overflow: hidden;
}

.big-avatar-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-upload-info {
  flex: 1;
}

.avatar-upload-info p {
  font-size: 0.82rem;
  color: var(--txt2);
  line-height: 1.5;
  margin-bottom: 10px;
}

.avatar-btns {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-upload {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 8px;
  background: var(--accent);
  border: none;
  color: #03122e;
  font-family: var(--font);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn-upload:hover {
  opacity: 0.85;
}

.btn-upload .ti {
  font-size: 16px;
}

.btn-remove {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid var(--border2);
  color: var(--txt2);
  font-family: var(--font);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.btn-remove:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-remove:not(:disabled):hover {
  border-color: var(--danger);
  color: var(--danger);
  background: var(--danger-bg);
}

.btn-remove .ti {
  font-size: 16px;
}

.fields-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.section-divider {
  height: 1px;
  background: var(--border);
  margin: 0 -28px;
}

.pass-error {
  font-size: 0.78rem;
  color: var(--danger);
}

.danger-zone {
  padding: 16px;
  border-radius: var(--r);
  border: 1px solid var(--danger-border);
  background: var(--danger-bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.danger-title {
  font-size: 0.83rem;
  font-weight: 500;
  color: var(--danger);
  margin-bottom: 3px;
}

.danger-sub {
  font-size: 0.75rem;
  color: var(--txt3);
  line-height: 1.5;
}

.btn-danger {
  padding: 7px 16px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid var(--danger-border);
  color: var(--danger);
  font-family: var(--font);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
}

.btn-danger:hover {
  background: var(--danger-bg);
}

.save-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding-top: 4px;
}

.btn-cancel {
  padding: 10px 20px;
  border-radius: var(--r);
  background: transparent;
  border: 1px solid var(--border2);
  color: var(--txt2);
  font-family: var(--font);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: background 0.15s;
}

.btn-cancel:hover {
  background: var(--card2);
}

.btn-save {
  padding: 10px 24px;
  border-radius: var(--r);
  background: var(--accent);
  border: none;
  color: #03122e;
  font-family: var(--font);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.1s;
}

.btn-save:hover {
  opacity: 0.88;
}

.btn-save:active {
  transform: scale(0.98);
}

@media (max-width: 600px) {
  .settings-layout {
    grid-template-columns: 1fr;
  }

  .settings-nav {
    border-right: none;
    border-bottom: 1px solid var(--border);
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px;
  }

  .snav-section {
    display: none;
  }

  .fields-grid {
    grid-template-columns: 1fr;
  }
}
</style>