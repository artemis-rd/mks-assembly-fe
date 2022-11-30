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
const chatName = useState("createdChatName")

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
  refresh: refreshRooms,
} = await useFetch<any[]>(`${MESSAGING_SERVICE}/rooms/list?userId=${id}`, {
  method: "GET",
  key: id.toString(),
});

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

const showGroups = ref(true);
const createGroups = ref(false);
const selectContact = ref(false);
const selected = ref(false);
const contactSelected = ref([]);
const groupNameScreen = ref(false);
const enterGroupName = ref(false);
const groupName = ref();
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
function showNameInput() {
  selectContact.value = !selectContact.value;
  enterGroupName.value = true;
}
function goBackToContacts() {
  enterGroupName.value = false;
  selectContact.value = !selectContact.value;
}
async function selectContactToJoinGroup() {
  let participants = {
    participants: {
      sender: id,
      receiver: "list of ids ",
    },
  };
  socket.emit("createRoom", participants, async (rmCreated) => {
    // showGroups.value = true;
    // createGroups.value = !createGroups.value;
    await refreshRooms();
    navigateTo(`/dashboard/messenger/groups/${rmCreated.id}`);
  });
  socket.on("r-createRoom", (data) => {
    // console.log("r created room", data);
    roomId.value = data.split(" ").slice(-1)[0];
  });
  selected.value = true;
  // if ((selected.value = true)) {
  //   let contactList = contactSelected.value.push(selectContact.value);
  //   await getContacts();
  //   let myContacts = allContacts.value;
  //   for (let x of myContacts) {
  //     // code
  //   }
  //   let listLength = contactSelected.value.length;
  // }
}
// create room if there is no existing room
function createRoom(receiverId, name) {
  if (id && receiverId) {
    let participants = {
      participants: {
        sender: id,
        receiver: receiverId,
      },
    };

    socket.emit("createRoom", participants, async (rmCreated) => {
      showGroups.value = true;
      createGroups.value = !createGroups.value;
      await refreshRooms();
      chatName.value = name
      navigateTo(`/dashboard/messenger/dm/${rmCreated.id}`);
    });
    socket.on("r-createRoom", (data) => {
      // console.log("r created room", data);
      roomId.value = data.split(" ").slice(-1)[0];
    });
    socket.on(`${receiverId}`, (data) => {
      socket.emit("joinRoom", data);
    });
  }
}
function checkReceiverName(receiverName, id) {
  chatName.value = receiverName
  navigateTo(`/dashboard/messenger/dm/${id}`);
}
// Group chats mock data
const groups = [
  {
    name: "House Business Committee",
    lastMessage: {
      content: "Hello can you check whether everything is working as it should",
      timestamp: new Date(Date.now()).toLocaleTimeString(),
    },
  },
  {
    name: "Legal Affairs",
    lastMessage: {
      content: "Hello can you check whether everything is working as it should",
      timestamp: new Date(Date.now()).toLocaleTimeString(),
    },
  },
  {
    name: "Lands and Energy",
    lastMessage: {
      content: "Hello can you check whether everything is working as it should",
      timestamp: new Date(Date.now()).toLocaleTimeString(),
    },
  },
];
</script>
<template>
  <div class="w-full px-2 md:flex h-screen ">
    <div class=" bg-gray-50 md:w-1/3 overflow-y-hidden relative">
      <div class="md:relative container w-full h-[94%] py-2" v-if="showGroups">
        <!-- messeges screen -->
        <div class="px-4">
          <h2 class="text-lg font-bold my-5 mb-2">Messenger</h2>
          <SearchInput placeholder="Search Messages" />
        </div>

        <!-- direct messages -->
        <div class="overflow-y-scroll h-[90%] md:absolute pb-4 w-full">
        <div class="my-1 text-sm" v-if="!pending">
          <p class="my-5 font-bold text-sm text-gray-700 px-4">Direct Messages</p>
          <div class=" hover:bg-gray-100 px-[15px] py-[0.5px]" v-for="item of rooms" :key="item.id">
            <a :to="`/dashboard/messenger/dm/${item.id}`" class="flex gap-2 px-1 my-4 cursor-pointer" @click.prevent="checkReceiverName(item.participants.sender.id == id
            ? item.participants.receiver.name
            : item.participants.sender.name, item.id)">
              <img class="" src="@/assets/img/profile.png" alt="loading" />
              <div class="flex-col flex-1">
                <div class="flex justify-between">
                  <p class=" font-semibold text-gray-700">
                    {{
                        item.participants.sender.id == id
                          ? item.participants.receiver.name
                          : item.participants.sender.name
                    }}
                  </p>
                  <p class="text-[12px] text-gray-700">4.14 p.m</p>
                </div>
                <p class="text-xs text-gray-400">
                  Hello, can you check whether everything is ..
                </p>
              </div>
            </a>
          </div>
        </div>
        <div v-else>
          <div class="loader">Retrieving chats...</div>
        </div>

        <div class="my-1 text-sm">
          <p class="my-5 font-bold text-sm text-gray-700">Group Messages</p>
          <div v-for="group in groups" :key="group.name">
            <NuxtLink to="/dashboard/messenger/groups/1" class="flex gap-2 my-4 px-1">
              <img class="" src="@/assets/img/group1.svg" alt="loading" />
              <div class="flex-col flex-1">
                <div class="flex justify-between">
                  <p class="text-gray-700 font-semibold">{{ group.name }}</p>
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
      <!-- start conversation button -->
      <div class="my-4 gap-4 flex flex-col max-w-3/4" v-if="createGroups">
        <button class="flex gap-6 items-center" @click="goBackToConversation()">
          <img class="w-4" src="@/assets/img/startConvIcon.svg" alt="loading" />
          <span class="text-md font-bold">Start a new Conversation</span>
        </button>

        <SearchInput />
        <button class="flex gap-4 items-center" @click="showContactToSelect()">
          <img class="w-6" src="@/assets/img/createContactIcon.svg" alt="loading" />
          <span class="text-red-500 font-xs font-semibold">Create a new Group</span>
        </button>
        <span class="my-4 text-gray-400 font-bold text-sm">Send Direct Message</span>
        <!-- starting a conversation screen -->
        <!-- contact list  -->
        <div class="">
          <div class="flex flex-col" v-for="contact in allContacts" :key="contact.id">
            <div class="flex flex-col gap-4 w-full pb-2">
              <a :to="`/dashboard/messenger/dm/${roomId}`" class="flex gap-4 cursor-pointer" event=""
                @click.prevent="createRoom(contact.id, contact.name)">
                <img class="w-10" src="@/assets/img/profile.png" alt="loading" />
                <div class="gap-2">
                  <p class="text-sm font-bold">
                    {{ contact.name }}
                  </p>
                  <span class="text-xs font-semibold text-gray-400">{{
                      contact.tel
                  }}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <!-- end of the screen -->
      </div>
      <!-- select contact for the group  -->
      <!-- enter the group name  -->
      <div class="mt-6 mr-4 w-4/12" v-if="enterGroupName">
        <div class="flex-col">
          <button class="cursor:pointer font-semibold flex gap-2 items-center" @click="goBackToContacts()">
            <img src="@/assets/img/ArrowLeft.svg" alt="" />

            Create a New Group
          </button>
          <div class="mt-2">
            <div class="text-sm">Creating with 33 selected Members</div>
          </div>
          <div class="mt-2 text-sm">
            <div class="text-sm">Enter the name of the group</div>
            <input class="border-solid border p-1 border-slate-300 rounded-md w-full" type="text" v-model="groupName"
              placeholder="Example: Marketing Department" />
          </div>
          <div class="">
            <button class="p-2 bg-red-100 text-xs font-semibold w-full mt-4 rounded-md text-red-500">
              Save Group Info
            </button>
          </div>
        </div>
      </div>
      <!-- contact screen -->
      <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
      <div class="my-4 gap-4 flex flex-col w-3/4" v-if="selectContact">
        <button class="flex gap-6 items-center outline-none" @click="goBackToStartConv()">
          <img class="w-4" src="@/assets/img/startConvIcon.svg" alt="loading" />
          <span class="text-md font-bold">Start a new Conversation</span>
        </button>

        <SearchInput />

        <span class="my-4 text-gray-400 font-bold text-sm">Select Group Members</span>
        <!-- starting a conversation screen -->
        <!-- contact list  -->

        <div class="flex flex-col gap-2 overflow-y-auto">
          <div class="" v-for="contact in allContacts" :key="contact.id">
            <div class="flex flex-col gap- w-full">
              <div class="flex gap-4 cursor-pointer" @click="selectContactToJoinGroup()">
                <img class="w-10" src="@/assets/img/profile.png" alt="loading" />
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
        <button class="text-red-500 font-semibold flex gap-2 content-center items-center" @click="showNameInput()">
          Next
          <img src="@/assets/img/ArrowRight.svg" alt="" />
        </button>
        <!-- end of the screen -->
      </div>
   
      <!-- start conv  button -->
      <button class="md:absolute bottom-0 right-0 z-10" @click="startConversation()">
            <img src="@/assets/img/chatIcon.svg" alt="" width="100" />
          </button>
    </div>
    <!-- message slot  -->
    <slot></slot>
  </div>
</template>
<style scoped>

</style>
