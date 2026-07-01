import { defineStore } from "pinia"
import { ref, computed } from "vue"
import api from "@/plugins/api"
import router from "@/routers"

export const useRegisterStore = defineStore("register", () => {

    const email = ref('')
    const password = ref('')
    const name = ref('')
    const response = ref(null)
    const error = ref(null)
    const loading = ref(false)

    const hasError = computed(() => !!error.value)


    async function createAccount(userEmail, userPassword, userName) {

        loading.value = true
        error.value = null

        try {
            const res = await api.post(`/users/`, {
                name: userName,
                email: userEmail,
                password: userPassword
            })

            response.value = res.data

            router.push("/login")
        } catch (err) {
            error.value =
                err.response?.data?.message ||
                err.response?.data ||
                "Error in create account"
        } finally {
            loading.value = false
        }
    }
    return {
        email,
        password,
        response,
        error,
        loading,
        hasError,
        createAccount
    }
})