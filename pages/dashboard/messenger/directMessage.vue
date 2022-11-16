<script setup lang="ts">
import { io, Socket } from "socket.io-client";
const receiverContact = useState("receiverContact");

const cookie = useCookie("mks-token");
let token = cookie.value;
const messageData = ref("");
const participantData = ref();
const rooomId = ref();

const {
  public: { AUTH_SOCKET_URL },
} = useRuntimeConfig();
const socket: Socket = io(`${AUTH_SOCKET_URL}`);
async function startSocket() {
  let brokenToken = token.split(".")[1];
  let decoded = JSON.parse(window.atob(brokenToken));
  // console.log(decoded.id, "decoded token");
  // console.log(receiverContact.value, "receee");
  //   let roomId = 7;
  //   let newMessage = "we are making a progress";
  socket.on("connect", () => {
    // console.log(token, "matoken");
    let timeStamp = Date.now();
    let participants = {
      participants: {
        sender: decoded.id,
        receiver: receiverContact.value,
      },
    };
    // console.log(timeStamp, "masaa");
    socket.emit("createRoom", participants);
    socket.on("createRoom", (data) => {
      // console.log(data, "rooom");
    });
    socket.on("r-createRoom", (data) => {
      // console.log(data, "dateee");
      rooomId.value = data.id;
      // console.log(JSON.parse(data.participants), "marespondii");
      participantData.value = JSON.parse(data.participants);
    });
    // socket.to(roomId).emit("newMessage", newMessage);
    // socket.emit("chat", { data: "hello yoh" }, (data) => console.log(data));
    // socket.on("r-chat", (data) => {
    //   console.log(data, "maundu ma nthi");
    // });
    // socket.on("chat", (data) => {
    //   console.log(data, "maundu ma nthiiiiiiiiii ta ");
    // });
  });
}
async function sendMessage() {
  let msg = {
    timeStamp: Date.now(),
    message: messageData.value,
    sender: participantData.value.sender,
    receiver: participantData.value.receiver,
    roomId: rooomId.value,
  };

  socket.emit("newMessage", msg);
  socket.on("r-newMessage", (data) => {
    console.log(data, "mameemememe");
  });
}
onMounted(() => {
  startSocket();
});
watch(receiverContact, (count) => {
  console.log(count, "watchee");
  startSocket();
});
</script>
<template>
  <div class="ml-2">
    <TopBar name="Paul Davidson" lastLogin="4.22pm" user="Angel Mwende" />
    <div class="border-y border-gray-300">
      <p class="text-gray-200 text-center font-semibold my-5 text-sm">
        The start of your conversation with Paul
      </p>

      <div class="flex-col flex mx-2 gap-2">
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
