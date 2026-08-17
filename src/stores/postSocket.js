import { defineStore } from "pinia";
import { ref } from "vue";

export const useFeedStore = defineStore("feedSocket", () => {
    const socket = ref(null);
    const posts = ref([]);
    const connected = ref(false);
    const error = ref(null);

    function getToken() {
        return localStorage.getItem("token") || sessionStorage.getItem("token");
    }

    function connect(room_id = "fbf51634-2393-4728-aea7-5c9a6ab676ad") {
        if (!room_id) {
            error.value = "Sala não informada.";
            return;
        }

        const token = getToken();

        if (!token) {
            error.value = "Usuário não autenticado.";
            return;
        }

        if (socket.value) {
            socket.value.close();
        }

        const wsUrl =
            `${import.meta.env.VITE_WS_URL}/ws/feed/${room_id}/?token=${encodeURIComponent(token)}`;

        console.log("Conectando:", wsUrl);

        socket.value = new WebSocket(wsUrl);

        socket.value.onopen = () => {
            console.log("Socket conectado");

            connected.value = true;
            error.value = null;
        };

        socket.value.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                console.log("WebSocket recebeu:", data);

                if (data.error) {
                    error.value = data.error;
                    return;
                }

                if (data.post) {
                    posts.value.unshift(data.post);
                    return;
                }

                if (data.posts) {
                    posts.value = data.posts;
                    return;
                }

            } catch (e) {
                console.error("Mensagem inválida:", event.data);
            }
        };

        socket.value.onerror = (event) => {
            console.error("Erro WebSocket:", event);

            error.value = "Erro na conexão com o servidor.";
        };

        socket.value.onclose = (event) => {
            console.log("Socket desconectado:", event.code, event.reason);

            connected.value = false;
            socket.value = null;

            const closeMessages = {
                4000: "Erro interno ao conectar.",
                4001: "Usuário não autenticado.",
                4002: "Sala não informada.",
                4004: "Sala não encontrada.",
            };

            if (closeMessages[event.code]) {
                error.value = closeMessages[event.code];
            }
        };
    }

    function send(data) {
        if (
            !socket.value ||
            socket.value.readyState !== WebSocket.OPEN
        ) {
            error.value = "Conexão indisponível.";
            return false;
        }

        try {
            socket.value.send(JSON.stringify(data));
            return true;
        } catch (e) {
            console.error("Erro ao enviar:", e);

            error.value = "Erro ao enviar mensagem.";

            return false;
        }
    }

    function disconnect() {
        if (socket.value) {
            socket.value.close();
            socket.value = null;
        }

        connected.value = false;
    }

    function clearPosts() {
        posts.value = [];
    }

    function clearError() {
        error.value = null;
    }

    return {
        socket,
        posts,
        connected,
        error,
        connect,
        send,
        disconnect,
        clearPosts,
        clearError,
    };
});