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
  console.log(rooomId, "roommmmmmu");
  socket.emit("joinRoom", { roomId: rooomId });
  socket.on(`${rooomId}`, (data) => {
    console.log(data, "returned data");
  });
}

watch(createdRoom, (room) => {
  console.log(room, "watchee");
  socket.emit("joinRoom", { roomId: room });
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
  console.log(msg, "the message");

  socket.emit("newMessage", msg, async () => {
    const id = await db.userMessages.add({
      timeStamp: Date.now().toString(),
      message: messageData.value,
      sender: senderId.value,
      roomId: parseInt(rooomId.toString()),
    });
  });
  socket.on("r-newMessage", (data) => {
    console.log(data, "mameemememe");
  });
}
const name = ref("Paul Davidson ");

async function getMessagesByRoom() {}
// const roomId = 847;
// console.log(roomId);

const {
  data: messageList,
  error,
  pending,
} = await useFetch<any>(`${MESSAGING_SERVICE}/message/list/${rooomId}`, {
  method: "GET",
});
</script>
<template>
  <div class="ml-2">
    <TopBar :name="name" lastLogin="4.22pm" user="Angel Mwende" />
    <div class="border-y border-gray-300">
      <p class="text-gray-200 text-center font-semibold my-5 text-sm">
        The start of your conversation with Paul
      </p>

      <div class="flex-col flex mx-2 gap-2">
        <p v-for="sendMsg in messageList" key="sendMsg.id">
          {{ sendMsg.message }}
        </p>
        <!-- conv one -->
        <div class="">
          <p class="text-xs ml-4 font-semibold text-gray-400 mb-1">04.22 p.m</p>
          <div class="p-2 rounded-bl-none rounded-2xl bg-red-50 w-3/4">
            <p class="text-xs font-semibold">
              Justo, ac lectus eu vitae. Sed urna metus, amet arcu justo, in
              tortor massa. Ut donec purus tristique risus mauris. Diam
              fermentum, iaculis vitae pellentesque sociis diam nulla. Quam nunc
              tristique ut lacus enim aliquet tempus feugiat senectus. Fermentum
              nunc pharetra arcu mi,
            </p>
          </div>
        </div>
        <!-- conv two -->
        <div class="">
          <div class="flex">
            <div class="w-1/2"></div>
            <div
              class="p-3 rounded-2xl text-cyan-50 bg-red-500 rounded-br-none"
            >
              <p class="text-xs flex justify-end font-semibold">
                Leo sed venenatis vestibulum a. Mauris libero vel odio semper.
                Dictum tempus tellus iaculis est varius hac ultrices. Et amet,
                lectus vulputate viverra urna sagittis faucib
              </p>
            </div>
          </div>
          <div
            class="flex gap-1 text-xs font-semibold text-gray-400 justify-end mt-1"
          >
            <p>sent</p>
            <p>04.22 p.m</p>
          </div>
        </div>
        <!-- conv three -->
        <div class="">
          <p class="text-xs ml-4 font-semibold text-gray-400 mb-0">04.22 p.m</p>
          <div class="p-3 rounded-bl-none rounded-2xl bg-red-50 w-3/4 mb-4">
            <p class="text-xs font-semibold">
              Aenean in at amet luctus condimentum vitae cras viverra eget.
              Vestibulum, tincidunt scelerisque libero e, imperdiet augue orci
              diam.
            </p>
          </div>
        </div>
        <!-- conve four -->
        <div class="">
          <p class="text-xs ml-4 font-semibold text-gray-400 mb-0">04.22 p.m</p>
          <div class="p-3 rounded-bl-none rounded-2xl bg-red-50 w-3/4 mb-4">
            <p class="text-xs font-semibold w-3/4">
              Arcu donec adipiscing orci odio consectetur neque gravida
              facilisis. Condimentum ut morbi a gravida purus fames ac
              facilisis. Facilisi aliquet mauris a scelerisque a sem. Ut
              adipiscing a, tempor ornare mi, molestie quis scelerisque
              vulputate. Quisque erat amet, donec sed fermentum est.
            </p>
          </div>
        </div>
        <!-- conve five -->
        <div class="">
          <div class="flex">
            <div class="w-1/2"></div>
            <div
              class="p-3 rounded-2xl text-cyan-50 bg-red-500 rounded-br-none"
            >
              <p class="text-xs font-semibold flex justify-end">
                Consectetur eget arcu, libero, commodo, cras id hendrerit
                sagittis. Amet condimentum orci.
              </p>
            </div>
          </div>
          <div
            class="flex gap-1 text-xs font-semibold text-gray-400 justify-end my-2"
          >
            <p>sent</p>
            <p>04.22 p.m</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-4 items-center mt-3">
      <textarea
        placeholder="Type something here ...."
        class="w-3/4 mt-2 outline-none text-xs"
        v-model="messageData"
      />
      <button class="flex items-center gap-4" @click="sendMessage()">
        <p class="text-red-500 text-medium font-medium">Send Message</p>
        <img class="w-4" src="@/assets/img/sent.svg" alt="loading" />
      </button>
    </div>
  </div>
</template>
