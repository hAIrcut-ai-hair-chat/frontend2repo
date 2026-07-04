import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/plugins/api";

export const useThinkStore = defineStore('think', () => {

    const loading = ref(false)
    const response = ref(false)
    const error = ref(false)
    const token = ref('')

    const hasError = computed(() => !!error.value)

    async function addThink(thought, userId, emoji) {

        loading.value = true
        error.value = null

        try {
            const res = await api.post('/think/', {
                thought: thought,
                user: 1,
                emoji: "adadada",
            })

            response.value = res.data

        } catch (err) {
            error.value = err.response?.data?.messasge || err.response?.data || "Error in add password"



        } finally {
            loading.value = false
        }


    }
    return {
        loading, 
        response, 
        error, 
        token,   
        hasError,
        addThink

    }
    
})