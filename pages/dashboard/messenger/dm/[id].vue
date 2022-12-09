<script setup lang="ts">
import { useSocketIO } from "~~/composables/sockets";
import { Ref } from "vue";
import { db } from "~~/data/db";
const createdRoom = useState("createdRoomId");
const receiverName: Ref<string> = useState("createdChatName");
const route = useRoute();
const cookie = useCookie("mks-token");
const token = cookie.value;
const messageData = ref("");
const rooomId = route.params.id;
const senderId = ref();
const socket = useSocketIO();
let brokenToken = token.split(".")[1];
senderId.value = JSON.parse(atob(brokenToken)).id;
const { MESSAGING_SERVICE } = useRuntimeConfig();

if (rooomId != undefined) {
  socket.emit("joinRoom", { roomId: rooomId });
  socket.on(`${rooomId}`, (data) => {
    // handle when an event is send to this partucular room
  });
}

watch(createdRoom, (room) => {
  socket.emit("joinRoom", { roomId: room });
  // ?? Not sure
  socket.on(`${room}`, (data) => {
    // console.log(data, "returned data");
  });
});

async function sendMessage() {
  const tosend = messageData.value.trim();
  if (tosend.length > 0) {
    let msg = {
      timeStamp: Date.now().toString(),
      message: messageData.value,
      sender: senderId.value,
      roomId: rooomId,
    };

    const id = await db.userMessages.add({
      timeStamp: Date.now().toString(),
      message: messageData.value,
      sender: senderId.value,
      roomId: parseInt(rooomId.toString()),
    });
    messages.value.push(msg);
    socket.emit("newMessage", msg, (reverseMessage) => {
      // console.log("the reverse message", reverseMessage);
    });
    // clear the input value
    messageData.value = "";
  }
}

socket.on(`r-newMessage-${rooomId}`, async (data) => {
  if (data.sender != senderId.value) {
    const id = await db.userMessages.add({
      timeStamp: Date.now().toString(),
      message: messageData.value.trim(),
      sender: senderId.value,
      roomId: parseInt(rooomId.toString()),
    });
    messages.value.push(data);
    // console.log(data, "checking sender");
  } else {
    return;
  }
});

const {
  data: messages,
  error,
  pending,
  refresh: refreshMessages,
} = await useFetch<any>(`${MESSAGING_SERVICE}/messages/list/${rooomId}`, {
  method: "GET",
  key: rooomId.toString(),
});

onMounted(async () => {
  if (!navigator.onLine) {
    const cache = (await db.userMessages.toArray()).filter(
      (x) => x.roomId == parseInt(rooomId.toString())
    );
    messages.value = cache;
  }
});
function editTime(theDate) {
  let newDate = new Date(theDate);
  return newDate.toLocaleTimeString();
}
</script>
<template>
  <div class="ml-2 relative h-screen md:w-full">
    <TopBar :name="receiverName" lastLogin="4.22pm" user="Angel Mwende" />
    <div class="p-4 h-[87%] flex flex-col-reverse overflow-y-scroll">
      <span class="text-white text-center flex-1 font-semibold my-1 text-sm">
        The start of your conversation with Paul
      </span>
      <div class="cont">
        <div
          class="flex-col flex mx-2 gap-2 my-2 max-w-2lg"
          v-for="sendMsg in messages"
          :key="sendMsg.timestamp"
        >
          <div class="flex flex-col">
            <div
              class="inline-block p-3 rounded-2xl text-xs font-semibold max-w-md max-w-3/4"
              :class="{
                'float-right bg-orange-500 text-cyan-50 rounded-br-none self-end':
                  sendMsg.sender == senderId,
                'rounded-tl-none bg-orange-50 self-start':
                  sendMsg.sender != senderId,
              }"
            >
              <p>{{ sendMsg.message }}</p>
            </div>
            <div
              :class="{
                'float-right  rounded-br-none text-[9px] self-end text-gray-400 mt-1':
                  sendMsg.sender == senderId,
                'rounded-tl-none text-[9px] self-start text-gray-400 mt-1':
                  sendMsg.sender != senderId,
              }"
            >
              {{ editTime(sendMsg.timeStamp) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white flex p-3 mt-3 gap-2 fixed md:absolute justify-between w-full bottom-0 border-t border-gray-300"
    >
      <textarea
        rows="2"
        placeholder="Type something here ...."
        class="w-full mt-0 outline-none text-xs resize-none overflow-y-auto scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-w-1 scrolling-touch"
        v-model="messageData"
        @keyup.enter="sendMessage()"
      />
      <button @click="sendMessage()">
        <img class="w-4" src="@/assets/img/sent.svg" alt="loading" />
      </button>
    </div>
  </div>
</template>
