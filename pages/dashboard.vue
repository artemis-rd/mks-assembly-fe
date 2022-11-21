<script lang="ts" setup>
import { io, Socket } from "socket.io-client";
import { db } from "~~/utils/db";

const {
  public: { MESSAGING_SOCKET_URL },
} = useRuntimeConfig();

onMounted(async() => {
  const socket: Socket = io(`${MESSAGING_SOCKET_URL}`);
  socket.on("connect", () => {
    console.log('Client connected', socket.id)
  })
  // get the id from the local store
  const userData = await db.user.toArray()
  const id = userData[0].id
  
  socket.on(id.toString(), (data) => {
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
    <NuxtLayout name="dashboard">
        <div class="chats-list"></div>
        <main class=" flex-1">
            <NuxtPage />
        </main>
    </NuxtLayout>
</template>