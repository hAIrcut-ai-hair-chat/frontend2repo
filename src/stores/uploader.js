import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/plugins/api";

export const useUploaderStore = defineStore("uploader", () => {
    const loading = ref(false);
    const response = ref(null);
    const error = ref(null);

    const hasError = computed(() => !!error.value);

    async function addUploader(image) {
        loading.value = true;
        response.value = null;
        error.value = null;

        try {
            if (!image) {
                return null;
            }

            const formData = new FormData();
            formData.append("file", image);

            const { data } = await api.post("/image/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            response.value = data;

            return data;
        } catch (err) {
            error.value =
                err.response?.data?.message ||
                err.response?.data?.detail ||
                err.response?.data ||
                "Erro ao enviar imagem.";

            throw err;
        } finally {
            loading.value = false;
        }
    }

    return {
        loading,
        response,
        error,
        hasError,
        addUploader,
    };
});