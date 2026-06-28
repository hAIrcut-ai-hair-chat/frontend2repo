import { createRouter, createWebHistory } from 'vue-router'

import FeedView from '@/views/FeedView.vue'
import CreateAccountView from '@/views/CreateAccountView.vue'
import LoginView from '@/views/LoginView.vue'
import RedefinePasswordView from '@/views/RedefinePasswordView.vue'
import SendEmailView from '@/views/SendEmailView.vue'

const routes = [
  {
    path: '/',
    name: 'Feed',
    component: FeedView
  },
  {
    path:"/create-account",
    name: "CreateAccount",
    component: CreateAccountView
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView

  },
  {
    path: "/redefine-password",
    name: "RedefinePassword",
    component: RedefinePasswordView
  },
  {
    path: "/send-email",
    name: "SendEmail",
    component: SendEmailView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router