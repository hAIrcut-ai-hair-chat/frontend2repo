import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/plugins/api";
import { useUploaderStore } from "@/stores/uploader";

export const usePostsStore = defineStore("posts", () => {
    const loading = ref(false);
    const response = ref(null);
    const error = ref(null);

    const uploader = useUploaderStore();

    const hasError = computed(() => !!error.value);

    async function addPost(text, image) {
        loading.value = true;
        response.value = null;
        error.value = null;

        try {
            let uploadedImage = null;

            if (image) {
                uploadedImage = await uploader.addUploader(image);
                console.log("Imagem enviada:", uploadedImage);
            }
            alert(typeof text)
            const payload = {
                text,
                user: 1,
                image: uploadedImage?.uuid ?? null,
            };

            console.log("Payload:", payload);

            const { data } = await api.post("/posts/", payload);

            response.value = data;
            return data;
        } catch (err) {
            console.error(err);

            error.value =
                err.response?.data?.message ||
                err.response?.data?.detail ||
                err.response?.data ||
                "Erro ao criar postagem.";

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
        addPost,
    };
});