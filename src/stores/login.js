import { defineStore } from "pinia"
import { ref, computed } from "vue"
import api from "@/plugins/api"
import router from "@/routers"

export const useAuthStore = defineStore('auth', () => {
    const token = ref(null)
    const loggedIn = ref(false)

    const isAuthenticated = computed(
        () => loggedIn.value && !!token.value
    )

    function unsetToken() {
        token.value = null
        loggedIn.value = false

        localStorage.removeItem('token')
        sessionStorage.removeItem('token')

        delete api.defaults.headers.common['Authorization']
    }

    function initializeAuth() {
        const storedToken =
            localStorage.getItem('token') ||
            sessionStorage.getItem('token')

        if (storedToken) {
            token.value = storedToken
            loggedIn.value = true

            api.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${storedToken}`
        }
    }

    async function login(
        email,
        password,
        rememberMe = false
    ) {
        try {
            const response = await api.post(
                '/token/',
                {
                    email,
                    password
                }
            )

            const { access } = response.data

            if (!access) {
                throw new Error(
                    'Token não retornado'
                )
            }

            token.value = access
            loggedIn.value = true

            const storage = rememberMe
                ? localStorage
                : sessionStorage

            storage.setItem(
                'token',
                access
            )

            api.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${access}`


            if (response.status == 200) {
                router.push("/")
            }
            return response.data
            

        } catch (error) {
            unsetToken()
            throw error
        }
    }

    initializeAuth()

    return {
        token,
        loggedIn,
        isAuthenticated,
        login,
        unsetToken,
        initializeAuth
    }
})