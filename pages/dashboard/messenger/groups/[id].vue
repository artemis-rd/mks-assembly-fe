<script setup lang="ts">
import { db } from "~~/data/db";
import { io, Socket } from "socket.io-client";
import { Ref } from "vue";
const cookie = useCookie("mks-token");
const token = cookie.value;
const senderId = ref();
const messageData = ref();
const route = useRoute();
const showContacts = ref(false);
const rooomId = route.params.id;
const showToggleContact = ref(false);
const chatName: Ref<string> = useState("createdChatName");

//  showToggleContact.value = useState("toggleShow");

const {
  public: { MESSAGING_SOCKET_URL },
} = useRuntimeConfig();
const socket: Socket = io(`${MESSAGING_SOCKET_URL}`);
const createdGroupRoom = useState("createdGroupRoomId");
// const group = ref("House Business Commitee ");
let brokenToken = token.split(".")[1];
senderId.value = JSON.parse(atob(brokenToken)).id;
const { MESSAGING_SERVICE } = useRuntimeConfig();

const {
  data: messages,
  error,
  pending,
} = await useFetch<any>(`${MESSAGING_SERVICE}/messages/list/${rooomId}`, {
  method: "GET",
  key: createdGroupRoom.toString(),
});

onMounted(() => {
  const route = useRoute();
  const messages = db.userMessages.filter(
    (x) => x.id.toString() === route.params.id
  );
  if (messages.count.length > 0) {
    // show the messages
  } else {
    return;
  }
});
if (rooomId != undefined) {
  socket.emit("joinRoom", { roomId: rooomId });
  socket.on(`${rooomId}`, (data) => {
    // handle when an event is send to this partucular room
  });
}

watch(createdGroupRoom, (room) => {
  socket.emit("joinRoom", { roomId: room });
  // ?? Not sure
  socket.on(`${room}`, (data) => {
    // console.log(data, "returned data");
  });
});
function toggleContacts() {
  showContacts.value = !showContacts.value;
}
async function sendGroupMessage() {
  if (messageData.value != "") {
    let msg = {
      timeStamp: Date.now().toString(),
      message: messageData.value,
      sender: senderId.value,
      roomId: rooomId,
      groupName: chatName.value,
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
  } else {
    return;
  }
});
const { data: groupContacts } = await useFetch<any[]>(
  `${MESSAGING_SERVICE}/rooms/groups/contacts?roomId=${rooomId}`,
  {
    method: "GET",
    // key: Math.floor(Math.random() * 1000).toString(),
  }
);
console.log(rooomId, "room id given");
console.log("conatcts ", groupContacts.value);
</script>
<template>
  <div class="ml-2 relative h-screen md:w-full">
    <TopBar :name="chatName" lastLogin="4.22pm" user="Angel Mwende" />
    <div
      v-if="showToggleContact"
      class="right-0 flex w-52 bg-red-100 mr-4 absolute p-2 rounded z-30"
      @click="toggleContacts()"
    >
      <div class="text-red-500 font-bold">show contacts</div>
    </div>
    <div class="flex">
      <div class="p-4 h-[90%] flex flex-col-reverse overflow-y-scroll flex-1">
        <span class="text-white text-center flex-1 font-semibold my-1 text-sm">
          The start of your conversation with Paul
        </span>
        <div class="cont">
          <!-- <p class="text-gray-200 text-center flex-1 font-semibold my-5 text-sm">
          The start of your conversation with John
        </p> -->
          <div
            class="flex-col flex mx-2 gap-2 my-2 max-w-2lg"
            v-for="sendMsg in messages"
            :key="sendMsg.timestamp"
          >
            <div class="">
              <div
                class="inline-block p-3 rounded-2xl text-xs font-semibold max-w-md max-w-3/4"
                :class="{
                  'float-right bg-orange-500 text-cyan-50 rounded-br-none':
                    sendMsg.sender == senderId,
                  'rounded-tl-none bg-orange-50': sendMsg.sender != senderId,
                }"
              >
                <p>{{ sendMsg.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-full px-8">
        <div
          class="font-extrabold cursor-pointer pb-2 pt-1 text-red-500"
          @click="toggleContacts()"
        >
          X
        </div>
        <div class="flex flex-col gap-2 overflow-y-auto">
          <div class="" v-for="contact in groupContacts" :key="contact.id">
            <div class="flex flex-col gap- w-full">
              <div class="flex gap-4 cursor-pointer">
                <div class="flex">
                  <img
                    class="w-10 z-20"
                    src="@/assets/img/profile.png"
                    alt="loading"
                  />
                </div>
                <div class="gap-2">
                  <p class="text-sm font-bold">{{ contact.name }}</p>
                  <span class="text-xs font-semibold text-gray-400">{{
                    contact.tel
                  }}</span>
                </div>
              </div>
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
        @keyup.enter="sendGroupMessage()"
      />
      <button @click="sendGroupMessage()">
        <!-- <p class="text-red-500 text-xs font-medium">Send Message</p> -->
        <img class="w-4" src="@/assets/img/sent.svg" alt="loading" />
      </button>
    </div>
  </div>
</template>
