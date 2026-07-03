import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/plugins/api";

export const useSettingsStore = defineStore("settings", () => {
  const image = ref(null)
  const user = ref('')
  const response = ref(null)
  const loading = ref(false)
  const error = ref(false)

  async function addImage(file, userId) {
    if (!file || !userId) {
      error.value = "Arquivo ou ID do usuário ausente"
      return
    }

    loading.value = true
    error.value = null
    response.value = null

    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await api.put(`/users/${userId}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      response.value = res.data
      image.value = file
    } catch (err) {
      error.value = err.response?.data?.message || err.response?.data || "Erro no upload da imagem"
      throw err 
    } finally {
      loading.value = false
    }
  }

  return { image, user, response, loading, error, addImage }
})