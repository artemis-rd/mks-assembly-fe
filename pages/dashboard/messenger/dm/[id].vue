<script setup lang="ts">
import { io, Socket } from "socket.io-client";
import { Ref } from "vue";
import { db } from "~~/utils/db"
const receiverContact = useState("receiverContact");

const cookie = useCookie("mks-token");
const token = cookie.value;
const messageData = ref("");
const participantData = ref();
const existingRoom = ref([]) as Ref<any[]>;
const rooomId = ref();
const senderId = ref();
const roomIdTaken = ref();

const {
  public: { MESSAGING_SOCKET_URL },
} = useRuntimeConfig();
const socket: Socket = io(`${MESSAGING_SOCKET_URL}`);

async function getCreatedRooms() {
  let brokenToken = token.split(".")[1];
  senderId.value = JSON.parse(window.atob(brokenToken)).id;
  const { MESSAGING_SERVICE } = useRuntimeConfig();
  let { data } = await useFetch<any>(`${MESSAGING_SERVICE}/chats/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (data.value) {
    console.log("data", data.value);
    let createdRooms = data.value;
    let sender = senderId.value;

    let existingRoom = createdRooms.filter(
      (x) =>
        x.participants.sender == sender &&
        x.participants.receiver == receiverContact.value
    );
    console.log(existingRoom, "existing room");

    // openin a socket for connection

    let participants = {
      participants: {
        sender: senderId.value,
        receiver: receiverContact.value,
      },
    };
    console.log(receiverContact.value, "the receiver");
    console.log();
    if (receiverContact.value) {
      if (existingRoom.length < 1) {
        socket.emit("createRoom", participants);
        socket.on("r-createRoom", (data) => {
          rooomId.value = data.split(" ").slice(-1)[0];
        });
        socket.on(`${receiverContact.value}`, (data) => {
          console.log(data, "wamekamuuu");
          socket.emit("joinRoom", data);
        });
      } else {
        for (let i = 0; i < existingRoom.length; i++) {
          roomIdTaken.value = existingRoom[i].id;
        }
        socket.emit("joinRoom", { roomId: roomIdTaken.value });
        console.log(roomIdTaken.value, "im here id");
        socket.on(`${roomIdTaken.value}`, (data) => {
          console.log(data, "returned data");
        });
      }
    }
  }
}
function sendMessage() {
  let msg = {
    timeStamp: Date.now().toString(),
    message: messageData.value,
    sender: senderId.value,
    receiver: receiverContact.value.toString(),
    roomId: parseInt(rooomId.value),
  };
  socket.emit("newMessage", async () => {
    const id = await db.userMessages.add({
      timeStamp: Date.now().toString(),
      message: messageData.value,
      sender: senderId.value,
      roomId: parseInt(rooomId.value),
    })
  });

  socket.emit("newMessage", msg, async () => {
    const id = await db.userMessages.add({
      timeStamp: Date.now().toString(),
      message: messageData.value,
      sender: senderId.value,
      roomId: parseInt(rooomId.value),
    });
  });
  socket.on("r-newMessage", (data) => {
    console.log(data, "mameemememe");
  });
}
const name = ref('Paul Davidson ')
const {
  public: { MESSAGING_SERVICE },
} = useRuntimeConfig();

async function getMessagesByRoom() {
}
const roomId = 847
const roomConversation = [
  {
    message: "hello",
    timeStamp: "123456789",
    receiver: "asdfgjuy",
    sender: "qwert"
  },
  {
    message: "hello there",
    timeStamp: "1234567899",
    receiver: "qwert",
    sender: "asdfgjuy"
  },
  {
    message: "umekua aje",
    timeStamp: "123456789",
    receiver: "asdfgjuy",
    sender: "qwert"
  },
  {
    message: "niko poa mimi",
    timeStamp: "123456789",
    receiver: "qwert",
    sender: "asdfgjuy"
  },
  {
    message: "Naona umemanage kuunda the design",
    timeStamp: "123456789",
    receiver: "asdfgjuy",
    sender: "qwert"
  },
  {
    message: "Commodo hendrerit luctus tellus, diam fermentum egestas molestie eu. Pellentesque semper egestas vulputate a. Vel amet quis scelerisque lectus ut ac viverra eget. Et porta volutpat egestas a. Ut non potenti est amet. Imperdiet ac dictum euismod at. A hendrerit amet, id tempor integer tincidunt in sit aenean.",
    timeStamp: "123456789",
    receiver: "qwert",
    sender: "asdfgjuy"
  }

]

const { data: messageList, error, pending } = await useFetch<any>(
  `${MESSAGING_SERVICE}/message/list/${roomId}`,
  {
    method: "GET",
  }
);

onMounted(async () => {
  const route = useRoute()
  name.value += route.params.id;

  getCreatedRooms();
  await getMessagesByRoom();
});
watch(receiverContact, async (count) => {
  console.log(count, "watchee");
  await getCreatedRooms();
});
</script>
<template>
  <div class="ml-2 relative h-screen">
    <TopBar :name="name" lastLogin="4.22pm" user="Angel Mwende" />
    <div class="p-4">
      <p class="text-gray-200 text-center font-semibold my-5 text-sm">
        The start of your conversation with Paul
      </p>

      <div class="flex-col flex mx-2 gap-2 my-2 max-w-2lg" v-for="sendMsg in roomConversation" key="sendMsg.receiver">
        <div class="">
          <div class="inline-block p-3 rounded-2xl   text-xs font-semibold max-w-md max-w-3/4"
            :class="{ 'float-right bg-orange-500 text-cyan-50 rounded-br-none': sendMsg.receiver == 'qwert', 'rounded-tl-none bg-orange-50': sendMsg.receiver !=='qwert' }">
            <p>{{ sendMsg.message }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex py-3 justify-between items-end mt-3 absolute w-full bottom-0 border-t border-gray-300">
      <textarea rows="6" placeholder="Type something here ...." class="w-4/5 mt-0 outline-none text-xs resize-none overflow-y-auto scrollbar-track-blue-lighter  scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-w-1 scrolling-touch" v-model="messageData"/>
      <button class="flex items-center gap-2 mx-7" @click="sendMessage()">
        <p class="text-red-500 text-xs font-medium">Send Message</p>
        <img class="w-3" src="@/assets/img/sent.svg" alt="loading" />
      </button>
    </div>
  </div>
</template>
