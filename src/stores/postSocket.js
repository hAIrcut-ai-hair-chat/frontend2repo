import { defineStore } from "pinia";
import { ref } from "vue";

export const useFeedStore = defineStore("feedSocket", () => {
    const socket = ref(null);
    const posts = ref([]);
    const connected = ref(false);

    function connect(room_id) {
        if (socket.value) {
            socket.value.close();
        }

        socket.value = new WebSocket(
            `${import.meta.env.VITE_WS_URL}/ws/feed/${room_id}/`
        );

        socket.value.onopen = () => {
            console.log("Socket conectado");
            connected.value = true;
        };

        socket.value.onmessage = (event) => {
            const data = JSON.parse(event.data);

            console.log("Novo evento:", data);

            if (data.post) {
                posts.value.unshift(data.post);
            }
        };

        socket.value.onerror = (error) => {
            console.error("Erro no WebSocket:", error);
        };

        socket.value.onclose = () => {
            console.log("Socket desconectado");
            connected.value = false;
            socket.value = null;
        };
    }

    function send(data) {
        if (!socket.value || socket.value.readyState !== WebSocket.OPEN) {
            console.warn("WebSocket não está conectado.");
            return;
        }

        socket.value.send(JSON.stringify(data));
    }

    function disconnect() {
        if (socket.value) {
            socket.value.close();
        }
    }

    function clearPosts() {
        posts.value = [];
    }

    return {
        socket,
        posts,
        connected,
        connect,
        send,
        disconnect,
        clearPosts,
    };
});