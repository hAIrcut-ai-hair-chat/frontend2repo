import { defineStore } from "pinia";
import { ref, computed } from "vue";

import api from "@/plugins/api";

export const useProfileStore = defineStore("profile", () => {
    const bios = ref("");
    const username = ref("");
    const name = ref("");
    const avatar = ref(null);
    const email = ref("");

    const response = ref(null);
    const error = ref(null);
    const loading = ref(false);

    const hasError = computed(() => !!error.value);

    async function getProfile() {
        loading.value = true;
        error.value = null;

        try {
            const res = await api.get("/profile/");

            response.value = res.data;

            bios.value = res.data.bios ?? "";
            username.value = res.data.username ?? "";
            name.value = res.data.name ?? "";
            avatar.value = res.data.avatar ?? null;
            email.value = res.data.email ?? "";

            return res.data;

        } catch (err) {
            error.value = err;
            console.error("Erro ao buscar perfil:", err);

            throw err;

        } finally {
            loading.value = false;
        }
    }

    async function updateProfile() {
        loading.value = true;
        error.value = null;

        try {
            const res = await api.patch("/profile/", {
                bios: bios.value,
                username: username.value,
                name: name.value,
                email: email.value,
            });

            response.value = res.data;

            bios.value = res.data.bios ?? "";
            username.value = res.data.username ?? "";
            name.value = res.data.name ?? "";
            email.value = res.data.email ?? "";

            return res.data;

        } catch (err) {
            error.value = err;
            console.error("Erro ao atualizar perfil:", err);

            throw err;

        } finally {
            loading.value = false;
        }
    }

    return {
        bios,
        username,
        name,
        avatar,
        email,

        response,
        error,
        loading,
        hasError,

        getProfile,
        updateProfile,
    };
});