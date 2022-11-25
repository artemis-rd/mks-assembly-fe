<script setup lang="ts">
import { Ref } from "vue";
import { io, Socket } from "socket.io-client";
const {
  public: { MESSAGING_SOCKET_URL },
} = useRuntimeConfig();
const receiverCont = useState("receiverContact");
const socket: Socket = io(`${MESSAGING_SOCKET_URL}`);
// const roomId = ref();
const roomId = useState("createdRoomId");

const directThreads = ref({});
const allContacts: Ref<any> = ref([]);

const {
  public: { MESSAGING_SERVICE },
} = useRuntimeConfig();

const token = useCookie("mks-token");
//TODO: a better way to handle the deprecated `atob`
const id = JSON.parse(atob(token.value.split(".")[1])).id;

const {
  data: rooms,
  error,
  pending,
} = await useFetch<any[]>(`${MESSAGING_SERVICE}/rooms/list?userId=${id}`, {
  method: "GET",
});

watch(rooms, (r) => {
  console.log("new room data");
});
// console.log(chatsList, "machats");
let { data: contacts } = await useFetch<any>(
  `${MESSAGING_SERVICE}/contacts/old/list`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
  }
);
allContacts.value = contacts.value;
console.log(rooms.value, "rooms");
// console.log(allContacts.value, "conatctis");

const showGroups = ref(true);
const createGroups = ref(false);
const selectContact = ref(false);
const selected = ref(false);
const contactSelected = ref([]);
const groupNameScreen = ref(false);
const activeColor = ref();
function startConversation() {
  showGroups.value = false;
  createGroups.value = !createGroups.value;
}
function showContactToSelect() {
  createGroups.value = false;
  selectContact.value = !selectContact.value;
}

function goBackToConversation() {
  createGroups.value = false;
  showGroups.value = !showGroups.value;
}
function goBackToStartConv() {
  selectContact.value = false;
  createGroups.value = !createGroups.value;
}
function goBackToSelectContact() {
  groupNameScreen.value = false;
  selectContact.value = !selectContact.value;
}
function sendContactdata(detail) {
  receiverCont.value = detail;
}
async function selectContactToJoinGroup() {
  selected.value = true;
  if ((selected.value = true)) {
    let contactList = contactSelected.value.push(selectContact.value);
    await getContacts();
    let myContacts = allContacts.value;
    for (let x of myContacts) {
      // code
    }
    let listLength = contactSelected.value.length;
  }
}
// create room if there is no existing room
function createRoom(receiverId) {
  if (id && receiverId) {
    let participants = {
      participants: {
        sender: id,
        receiver: receiverId,
      },
    };
    console.log(participants, "participants");
    socket.emit("createRoom", participants);
    socket.on("r-createRoom", (data) => {
      roomId.value = data.split(" ").slice(-1)[0];

      // console.log(roomId.value, "room id has come");
    });
    socket.on(`${receiverId}`, (data) => {
      socket.emit("joinRoom", data);
    });
  }
}
</script>
<template>
  <div class="flex">
    <div class="mx-2 my-3 mb-0 container max-w-fit" v-if="showGroups">
      <!-- messeges screen -->
      <div class="">
        <h2 class="text-lg font-bold my-5 mb-2">Messenger</h2>
        <SearchInput />
      </div>

      <!-- direct messages -->
      <div class="my-1 text-sm" v-if="!pending">
        <p class="my-5 font-bold text-sm text-gray-700">Direct Messages</p>
        <div class="">
          <div class="" v-for="item of rooms" :key="item.id">
            <div class="">
              <NuxtLink
                :to="`/dashboard/messenger/dm/${item.id}`"
                class="flex gap-2 my-4"
              >
                <img class="" src="@/assets/img/profile.png" alt="loading" />
                <div class="flex-col">
                  <div class="flex justify-between">
                    <p class="font-bold text-gray-700">
                      {{ item.participants.receiver.name }}
                    </p>
                    <p class="text-sm font-medium text-gray-700">4.14 p.m</p>
                  </div>
                  <p class="text-xs text-gray-400">
                    Hello, can you check whether everything is okay...
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="loader">Retrieving chats...</div>
      </div>

      <div class="my-1 text-sm">
        <p class="my-5 font-bold text-sm text-gray-700">Group Messages</p>
        <NuxtLink to="/dashboard/messenger/groups/1" class="flex gap-2 my-4">
          <img class="" src="@/assets/img/group1.svg" alt="loading" />
          <div class="flex-col">
            <div class="flex justify-between">
              <p class="text-gray-700 font-semibold">House Business Comm</p>
              <p class="text-sm font-medium text-gray-700">4.14 p.m</p>
            </div>
            <p class="text-xs text-gray-400">
              Hello, can you check whether everything is okay...
            </p>
          </div>
        </NuxtLink>
        <!-- thread two -->
        <NuxtLink
          to="/dashboard/messenger/groups/2"
          class="flex gap-2 active:bg-slate-300 my-4"
        >
          <img class="" src="@/assets/img/group2.svg" alt="loading" />
          <div class="flex-col">
            <div class="flex justify-between">
              <p class="text-gray-700 font-semibold">Finance Department</p>
              <p class="text-sm font-medium text-gray-700">3.10 p.m</p>
            </div>
            <p class="text-xs text-gray-400">
              I think we have a problem with the drainage....
            </p>
          </div>
        </NuxtLink>
        <!-- thread group three -->
        <NuxtLink
          to="/dashboard/messenger/groups/3"
          class="flex gap-2 active:bg-slate-300 my-4"
        >
          <img class="" src="@/assets/img/group3.svg" alt="loading" />
          <div class="flex-col">
            <div class="flex justify-between">
              <p class="text-gray-700 font-semibold">Lands And Energy</p>
              <p class="text-sm font-medium text-gray-700">2.49 p.m</p>
            </div>
            <p class="text-xs text-gray-400">
              Can you confirm whether internet services are....
            </p>
          </div>
        </NuxtLink>

        <!-- thread group three -->
        <NuxtLink
          to="/dashboard/messenger/groups/4"
          class="flex gap-2 active:bg-slate-300"
        >
          <img class="" src="@/assets/img/group4.svg" alt="loading" />
          <div class="flex-col">
            <div class="flex justify-between">
              <p class="text-gray-700 font-semibold">ICT Directorate</p>
              <p class="text-sm font-medium text-gray-700">Saturday 2.49 p.m</p>
            </div>
            <p class="text-xs text-gray-400">
              Can you confirm whether internet services are....
            </p>
          </div>
        </NuxtLink>
        <button class="absolute bottom-0" @click="startConversation()">
          <img src="@/assets/img/chatIcon.svg" alt="" width="100" />
        </button>
      </div>
    </div>
    <!-- start conversation button -->
    <div class="my-4 gap-4 flex flex-col w-3/4" v-if="createGroups">
      <button class="flex gap-6 items-center" @click="goBackToConversation()">
        <img class="w-4" src="@/assets/img/startConvIcon.svg" alt="loading" />
        <span class="text-md font-bold">Start a new Conversation</span>
      </button>

      <SearchInput />
      <button class="flex gap-4 items-center" @click="showContactToSelect()">
        <img
          class="w-6"
          src="@/assets/img/createContactIcon.svg"
          alt="loading"
        />
        <span class="text-red-500 font-xs font-semibold"
          >Create a new Group</span
        >
      </button>
      <span class="my-4 text-gray-400 font-bold text-sm"
        >Send Direct Message</span
      >
      <!-- starting a conversation screen -->
      <!-- contact list  -->
      <div class="">
        <div
          class="flex flex-col"
          v-for="contact in allContacts"
          :key="contact.id"
        >
          <div class="flex flex-col gap-4 w-full pb-2">
            <NuxtLink
              :to="`/dashboard/messenger/dm/${roomId}`"
              class="flex gap-4"
              @click="createRoom(contact.id)"
            >
              <img class="w-10" src="@/assets/img/profile.png" alt="loading" />
              <div class="gap-2">
                <p class="text-sm font-bold">
                  {{ contact.name }}
                </p>
                <span class="text-xs font-semibold text-gray-400">{{
                  contact.tel
                }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <!-- end of the screen -->
    </div>
    <!-- select contact for the group  -->
    <!-- contact screen -->
    <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
    <div class="my-4 gap-4 flex flex-col w-3/4" v-if="selectContact">
      <button
        class="flex gap-6 items-center outline-none"
        @click="goBackToStartConv()"
      >
        <img class="w-4" src="@/assets/img/startConvIcon.svg" alt="loading" />
        <span class="text-md font-bold">Start a new Conversation</span>
      </button>

      <SearchInput />

      <span class="my-4 text-gray-400 font-bold text-sm"
        >Select Group Members</span
      >
      <!-- starting a conversation screen -->
      <!-- contact list  -->
      <div class="flex flex-col gap-2 overflow-y-auto h-3/5">
        <div class="" v-for="contact in allContacts" key="contact.phoneNumber">
          <div class="flex flex-col gap- w-full">
            <div class="flex gap-4" @click="selectContactToJoinGroup()">
              <img class="w-10" src="@/assets/img/profile.png" alt="loading" />
              <div class="gap-2">
                <p class="text-sm font-bold">
                  {{ contact.fName }} {{ contact.lName }}
                </p>
                <span class="text-xs font-semibold text-gray-400">{{
                  contact.phoneNumber
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end of the screen -->
    </div>
    <!-- message slot  -->
    <slot></slot>
  </div>
</template>
<style scoped></style>
