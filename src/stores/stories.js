import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import api from "@/plugins/api";
import { useUploaderStore } from "./uploader";


export const useStoriesStore = defineStore("stories", () => {
    const loading = ref(false)
    const response = ref(null)
    const error = ref(null)

    const uploader = useUploaderStore()

    async function addStory(description, image) {
        loading.value = true
        response.value = null
        error.value = null

        try {
            let uploadedImage = null
            if (image) {
                uploadedImage = await uploader.addUploader(image);
            }

            const payload = {
                description: description || null,
                image: uploadedImage
            }

            const { data } = await api.post("/story/", payload);

            response.value = data
            return data;
        } catch (err) {
            console.error(err)
            error.value =
                err.response?.data?.message ||
                err.response?.data?.detail ||
                err.response?.data ||
                "Erro ao criar postagem.";
            throw error
        }

        finally {
            loading.value = false;
        }
    }
    return {
        loading,
        response,
        error,
        hasError,
        addStory
    };
})