import { defineStore } from "pinia";
import { ref, computed } from "vue"
import api from "@/plugins/api"
import router from "@/routers";
   
export const useForgetPasswordStore = defineStore("forget_password", () => {
    const email = ref("");
    const code = ref("")
    const password = ref("")

    const response = ref(null);
    const error = ref(null);
    const loading = ref(false);

    const hasError = computed(() => !!error.value);

    async function forgetPassword() {
        loading.value = true;
        error.value = null;
        response.value = null;

        try {
            const { data } = await api.post("/password/code/", {
                email: email.value,
            });

            response.value = data;

            router.push("/redefine-password");

            return data;
        } catch (err) {
            error.value =
                err.response?.data?.message ||
                "Erro ao enviar email de recuperação.";

            throw err;
        } finally {
            loading.value = false;
        }
  
    }
    async function redefinePassword() {
        loading.value = true
        error.value = null
        response.value = null
        try {
            const { data } = await api.post("/password/update/", {
                email: email.value,
                code: code.value,
                password: password.value
            })
            response.value = data;
            router.push("/login")
        }
        catch (err) {
            error.value = err.response?.data?.message || "Erro ao redefinir senha"
            throw err;


        }   
        finally {
            loading.value = false   
        }
        
    }

    return {
        email,
        code,
        password,

        response,
        error,
        loading,
        hasError,

        forgetPassword,
        redefinePassword,
    }
})