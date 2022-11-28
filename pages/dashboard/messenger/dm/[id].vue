<script setup lang="ts">
import { io, Socket } from "socket.io-client";
import { Ref } from "vue";
import { db } from "~~/data/db";
const createdRoom = useState("createdRoomId");
const route = useRoute();
const cookie = useCookie("mks-token");
const token = cookie.value;
const messageData = ref("");
const participantData = ref();
const existingRoom = ref([]) as Ref<any[]>;
const rooomId = route.params.id;
const senderId = ref();

const {
  public: { MESSAGING_SOCKET_URL },
} = useRuntimeConfig();
const socket: Socket = io(`${MESSAGING_SOCKET_URL}`);

// async function getCreatedRooms() {
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
    console.log(data, "returned data");
  });
});
function sendMessage() {
  let msg = {
    timeStamp: Date.now().toString(),
    message: messageData.value,
    sender: senderId.value,
    roomId: rooomId,
  };

  socket.emit("newMessage", msg, async () => {
    const id = await db.userMessages.add({
      timeStamp: Date.now().toString(),
      message: messageData.value,
      sender: senderId.value,
      roomId: parseInt(rooomId.toString()),
    });
  });
  socket.on("r-newMessage", (data) => {
    // handle a new message that is received
  });
}
const name = ref("Paul Davidson ");

async function getMessagesByRoom() {}
const roomConversation = [
  {
    message: "hello",
    timeStamp: "123456789",
    receiver: "asdfgjuy",
    sender: "qwert",
  },
  {
    message: "hello there",
    timeStamp: "1234567899",
    receiver: "qwert",
    sender: "asdfgjuy",
  },
  {
    message: "umekua aje",
    timeStamp: "123456789",
    receiver: "asdfgjuy",
    sender: "qwert",
  },
  {
    message: "niko poa mimi",
    timeStamp: "123456789",
    receiver: "qwert",
    sender: "asdfgjuy",
  },
  {
    message: "Naona umemanage kuunda the design",
    timeStamp: "123456789",
    receiver: "asdfgjuy",
    sender: "qwert",
  },
  {
    message:
      "Commodo hendrerit luctus tellus, diam fermentum egestas molestie eu. Pellentesque semper egestas vulputate a. Vel amet quis scelerisque lectus ut ac viverra eget. Et porta volutpat egestas a. Ut non potenti est amet. Imperdiet ac dictum euismod at. A hendrerit amet, id tempor integer tincidunt in sit aenean.",
    timeStamp: "123456789",
    receiver: "qwert",
    sender: "asdfgjuy",
  },
  
];

const {
  data: messageList,
  error,
  pending,
} = await useFetch<any>(`${MESSAGING_SERVICE}/message/list/${rooomId}`, {
  method: "GET",
});
console.log(messageList, "my meso with room id");

</script>
<template>
  <div class="ml-2 relative h-screen md:w-full">
    <TopBar :name="name" lastLogin="4.22pm" user="Angel Mwende" />
    <div class="p-4 overflow-y-auto">
      <p class="text-gray-200 text-center font-semibold my-5 text-sm">
        The start of your conversation with Paul
      </p>

      <div
        class="flex-col flex mx-2 gap-2 my-2 max-w-2lg"
        v-for="sendMsg in messageList"
        key="sendMsg.receiver"
      >
        <div class="">
          <div
            class="inline-block p-3 rounded-2xl text-xs font-semibold max-w-md max-w-3/4"
            :class="{
              'float-right bg-orange-500 text-cyan-50 rounded-br-none':
                sendMsg.receiver == 'qwert',
              'rounded-tl-none bg-orange-50': sendMsg.receiver !== 'qwert',
            }"
          >
            <p>{{ sendMsg.message }}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white flex p-3 mt-3 gap-2 absolute justify-between w-full bottom-0 border-t border-gray-300"
    >
      <textarea
        rows="2"
        placeholder="Type something here ...."
        class="w-full mt-0 outline-none text-xs resize-none overflow-y-auto scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-w-1 scrolling-touch"
        v-model="messageData"
      />
      <button @click="sendMessage()">
        <!-- <p class="text-red-500 text-xs font-medium">Send Message</p> -->
        <img class="w-4" src="@/assets/img/sent.svg" alt="loading" />
      </button>
    </div>
  </div>
</template>
