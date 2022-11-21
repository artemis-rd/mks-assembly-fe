<script setup lang="ts">
import { io, Socket } from "socket.io-client";

const {
  public: { AUTH_SOCKET_URL },
} = useRuntimeConfig();

onMounted(() => {
  const socket: Socket = io(`${AUTH_SOCKET_URL}`);
  socket.on("connect", () => {
    console.log('Client connected', socket.id)
  })
  socket.on("40c21472-0552-4613-8ca5-ff48321bbc8b", (data) => {
    console.log('pinged', data);
    socket.emit("joinRoom", data, (rm) => {
      console.log('returned room', rm);
    });
  })

  socket.on("r-newMessage", (message) => {
    console.log('Received the new message', message);
  })
})

</script>
<template>
  <div>
    <NuxtPage />
  </div>
</template>
