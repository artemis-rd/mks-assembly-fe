<script setup lang="ts">
import moment from "moment";
import { Ref } from "vue";
import { useSocketIO } from "~~/composables/sockets";
const socket = useSocketIO();
const receiverCont = useState("receiverContact");

const theRoomId = useState("idCreate");

// const roomId = ref();

const roomId = useState("createdRoomId");
const chatName = useState("createdChatName");
const createdGroupRoom = useState("createdGroupId");
const adminNumber = useState("adminId");
const passedGroup = useState("groupData");
const showAddContact = useState<boolean>("showToAddContact", () => false);
const addContactButton = ref(false);
const roomList = ref([]) as Ref<any[]>;
const roomListAdd = ref([]) as Ref<any[]>;
const showGroups = ref(true);
const createGroups = ref(false);
const selectContact = ref(false);
const selected = ref(false);
const groupNameScreen = ref(false);
const enterGroupName = ref(false);
const groupName = ref();
const searchData = ref("");
const filteredGroups = ref([]) as Ref<any[]>;
const filteredRooms = ref([]) as Ref<any[]>;
const allContacts: Ref<any> = ref([]);
const groupId = ref();
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
  addContactButton.value = false;
  selectContact.value = !selectContact.value;
}
function sendAdmin(admin) {
  adminNumber.value = admin;
}
function goBackToMessages() {
  showGroups.value = true;
  showAddContact.value = false;
}
function showAddContactButton() {
  addContactButton.value = true;
  showAddContact.value = false;
}
const {
  public: { MESSAGING_SERVICE },
} = useRuntimeConfig();

const token = useCookie("mks-token");
//TODO: a better way to handle the deprecated `atob`
const id = JSON.parse(atob(token.value.split(".")[1])).id;
const loader = ref(false);
const {
  data: rooms,
  error,
  pending,
  refresh: refreshRooms,
} = await useFetch<any[]>(`${MESSAGING_SERVICE}/rooms/list?userId=${id}`, {
  method: "GET",
  key: id.toString(),
});
filteredRooms.value = rooms.value;
// console.log(rooms.value, "marroms");
for (let i = 0; i < filteredRooms.value.length; i++) {
  let lastMessage = await getLastMessage(filteredRooms.value[i].id);
  filteredRooms.value[i].lastMessage = lastMessage.message;
  filteredRooms.value[i].timestamp = new Date(lastMessage.timeStamp);
}
type LastMessageResponse = {
  id: string;
  message: string;
  timeStamp: Date;
};

async function getLastMessage(room) {
  const { data: LastMessage } = await useFetch<LastMessageResponse>(
    `${MESSAGING_SERVICE}/messages/last-last?roomId=${room}`,
    { method: "GET", key: room + "mks-sms" }
  );
  return LastMessage.value;
}

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
let foundUser = allContacts.value.find((x: any) => x.id == id);
let userTel = foundUser.tel;
roomList.value.push(foundUser.tel);
type group = {
  createdAt: string;
  groupAdmin: string;
  groupSlug: string;
  id: string;
  name: string;
  participants: string[];
  lastMessage: string;
};
const { data: groupRooms, refresh: refreshGroupRooms } = await useFetch<
  group[]
>(`${MESSAGING_SERVICE}/rooms/groups`, {
  body: { tel: userTel },
  method: "POST",
  key: `${id}-groups`,
});
filteredGroups.value = groupRooms.value;
for (let i = 0; i < filteredGroups.value.length; i++) {
  let lastMessage = await getLastMessage(filteredGroups.value[i].id);
  filteredGroups.value[i].lastMessage = lastMessage.message;
  filteredGroups.value[i].timestamp = new Date(lastMessage.timeStamp);
}
function changeName(valueGiven) {
  let converted = valueGiven.toUpperCase();
  let newName = converted.split(" ");
  let firstWord = newName[0][0];
  let finalName = "";
  if (newName.length > 1) {
    let last = newName.pop()[0];
    finalName = firstWord + last;
    return finalName;
  }
  return firstWord[0];
}
function capitalizeName(user: any) {
  if (user) {
    let givenName = user.split(" ");
    for (let i = 0; i < givenName.length; i++) {
      givenName[i] =
        givenName[i].charAt(0).toUpperCase() + givenName[i].slice(1);
    }
    return givenName.join(" ");
  }
}
function selectContactToJoinGroup(contact) {
  if (roomList.value.includes(contact)) {
    const index = roomList.value.indexOf(contact);
    if (index > -1) {
      roomList.value.splice(index, 1);
    }
  } else {
    roomList.value.push(contact);
  }
}
function createNewGroup() {
  loader.value = true;
  let obj = {
    groupName: groupName.value,
    groupParticipants: roomList.value,
    groupAdmin: id,
  };
  socket.emit("createRoom", obj, async (groupRmCreated) => {
    enterGroupName.value = false;
    showGroups.value = true;
    // createGroups.value = !createGroups.value;
    createdGroupRoom.value = groupRmCreated.id;
    // await refreshGroupRooms;
    navigateTo(`/dashboard/messenger/groups/${groupRmCreated.id}`);
  });
  socket.on("r-createRoom", (data) => {
    filteredGroups.value.unshift(data);
    roomId.value = data.id;
  });
  selected.value = true;
  groupName.value = "";
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
      // await refreshRooms();
      chatName.value = name;
      navigateTo(`/dashboard/messenger/dm/${rmCreated.id}`);
    });
    socket.on("r-createRoom", (data) => {
      filteredRooms.value.unshift(data);
      roomId.value = data.id;
    });
    socket.on(`${receiverId}`, (data) => {
      socket.emit("joinRoom", data);
    });
  }
}
function checkReceiverName(receiverName, id, isGroup) {
  chatName.value = receiverName;
  theRoomId.value = id;
  groupId.value = id;
  if (isGroup) {
    navigateTo(`/dashboard/messenger/groups/${id}`);
  } else navigateTo(`/dashboard/messenger/dm/${id}`);
}
async function addNewContact() {
  const { data: response } = await useFetch<group[]>(
    `${MESSAGING_SERVICE}/rooms/participants/add`,
    {
      body: { participants: roomList.value },
      params: { roomId: groupId.value },
      method: "POST",
      key: `${id}-groupsAdd`,
    }
  );
}
watch(searchData, (data) => {
  filteredGroups.value = groupRooms.value.filter((x: any) =>
    x.name.toLocaleLowerCase().includes(searchData.value.toLocaleLowerCase())
  );
  let searchedRooms = rooms.value.filter(
    (x: any) =>
      x.participants.sender.name
        .toLocaleLowerCase()
        .includes(searchData.value.toLocaleLowerCase()) ||
      x.participants.receiver.name
        .toLocaleLowerCase()
        .includes(searchData.value.toLocaleLowerCase())
  );
  filteredRooms.value = searchedRooms;
});
</script>
<template>
  <div class="w-full px-2 md:flex h-screen">
    <div class="bg-gray-50 md:w-1/3 overflow-y-hidden relative">
      <div
        class="md:relative container w-full h-[94%] py-2"
        v-if="showGroups && !showAddContact && !addContactButton"
      >
        <!-- messeges screen -->
        <div class="px-4">
          <h2 class="text-lg font-bold my-5 mb-2">Messenger</h2>
          <SearchInput placeholder="Search Messages" v-model="searchData" />
        </div>
        <!-- direct messages -->
        <div class="overflow-y-auto h-[90%] md:absolute pb-4 w-full">
          <div class="my-1 text-sm" v-if="!pending">
            <p class="my-5 font-bold text-sm text-gray-700 px-4">
              Direct Messages
            </p>

            <div
              class="hover:bg-gray-100 py-[0.5px]"
              v-for="item of filteredRooms"
              :key="item.id"
            >
              <NuxtLink
                :to="`/dashboard/messenger/dm/${item.id}`"
                class="flex gap-2 p-[15px] cursor-pointer"
                @click.prevent="
                  checkReceiverName(
                    item.participants.sender.id == id
                      ? item.participants.receiver.name
                      : item.participants.sender.name,
                    item.id,
                    false
                  )
                "
              >
                <div
                  class="border-2 border-solid rounded-full border-orange-500 content-center align-center p-2 w-10 font-bold h-10 text-center"
                >
                  {{
                    changeName(
                      item.participants.sender.id == id
                        ? item.participants.receiver.name
                        : item.participants.sender.name
                    )
                  }}
                </div>
                <div class="flex-col flex-1">
                  <div class="flex justify-between">
                    <p class="font-semibold text-gray-700">
                      {{
                        capitalizeName(
                          item.participants.sender.id == id
                            ? item.participants.receiver.name
                            : item.participants.sender.name
                        )
                      }}
                    </p>

                    <p class="text-[12px] text-gray-700">
                      {{ moment(item.timestamp).format("h:mm a") }}
                    </p>
                  </div>
                  <p class="text-xs text-gray-400">
                    {{
                      item.lastMessage == undefined
                        ? ""
                        : item.lastMessage.slice(0, 25) + "..."
                    }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
          <div v-else>
            <Loading />
          </div>

          <div class="my-1 text-sm">
            <p class="my-5 font-bold text-sm text-gray-700 px-3 py-3">
              Group Messages
            </p>

            <div
              v-if="!pending"
              class="hover:bg-gray-100 py-[0.5px]"
              v-for="group of filteredGroups"
              :key="group.id"
            >
              <NuxtLink
                :to="`/dashboard/messenger/groups/${group.id}`"
                class="flex gap-2 p-[15px] cursor-pointer link-active"
                @click.prevent="
                  checkReceiverName(group.name, group.id, true),
                    sendAdmin(group.groupAdmin)
                "
              >
                <div
                  class="border-2 border-solid rounded-full border-orange-500 content-center align-center p-2 w-10 font-bold h-10 text-center"
                >
                  {{ changeName(group.name.toString()) }}
                </div>

                <div class="flex-col flex-1">
                  <div class="flex justify-between">
                    <p class="text-gray-700 font-semibold">
                      {{ capitalizeName(group.name) }}
                    </p>
                    <p class="text-sm font-medium text-gray-700">
                      {{ moment(group.timestamp).format("h:mm a") }}
                    </p>
                  </div>
                  <p class="text-xs text-gray-400">
                    {{
                      group.lastMessage == undefined
                        ? ""
                        : group.lastMessage.slice(0, 25) + "..."
                    }}
                  </p>
                </div>
              </NuxtLink>
            </div>
            <Loading v-else />
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
        <div class="overflow-y-auto">
          <div
            class="flex flex-col"
            v-for="contact in allContacts"
            :key="contact.id"
          >
            <div
              class="flex flex-col gap-4 w-full pb-2"
              v-if="contact.id != id"
            >
              <a
                :to="`/dashboard/messenger/dm/${roomId}`"
                class="flex gap-4 cursor-pointer"
                event=""
                @click.prevent="createRoom(contact.id, contact.name)"
              >
                <img
                  class="w-10"
                  src="@/assets/img/profile.png"
                  alt="loading"
                />
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
      <div class="mt-6 mr-4 max-w-1/3 p-4" v-if="enterGroupName">
        <div class="flex-col">
          <button
            class="cursor:pointer font-semibold flex gap-2 items-center"
            @click="goBackToContacts()"
          >
            <img src="@/assets/img/ArrowLeft.svg" alt="" />

            Create a New Group
          </button>
          <div class="mt-2">
            <div class="text-sm">
              Creating with
              <span class="font-bold">{{ roomList.length - 1 }} </span>
              selected Members
            </div>
          </div>
          <div class="mt-2 text-sm">
            <div class="text-sm">Enter the name of the group</div>
            <input
              class="border-solid outline-none border p-1 border-slate-300 rounded-md w-full px-3 py-2"
              type="text"
              v-model="groupName"
              placeholder="Example: Marketing Department"
            />
          </div>
          <div class="">
            <button
              v-if="!loader"
              class="p-2 bg-red-100 text-xs font-semibold w-full mt-4 rounded-md text-red-500"
              @click="createNewGroup()"
            >
              Save Group Info
            </button>
            <Loading v-else />
          </div>
        </div>
      </div>
      <div class="mt-6 mr-4 max-w-1/3 p-4" v-if="addContactButton">
        <div class="flex-col">
          <button
            class="cursor:pointer font-semibold flex gap-2 items-center"
            @click="goBackToContacts()"
          >
            <img src="@/assets/img/ArrowLeft.svg" alt="" />

            Go Back
          </button>
          <div class="mt-2">
            <div class="text-sm">
              You are about to Add
              <span class="font-bold">{{ roomList.length - 1 }} </span>
              members in the group
            </div>
          </div>

          <div class="">
            <button
              v-if="!loader"
              class="p-2 bg-red-100 text-xs font-semibold w-full mt-4 rounded-md text-red-500"
              @click="addNewContact()"
            >
              Add {{ roomList.length - 1 }} Members
            </button>
            <Loading v-else />
          </div>
        </div>
      </div>
      <!-- contact screen -->
      <div
        class="my-4 gap-4 flex flex-col w-3/4"
        v-if="selectContact || (showAddContact && !showGroups)"
      >
        <button
          class="flex gap-6 items-center outline-none"
          @click="goBackToStartConv()"
          v-if="selectContact"
        >
          <img class="w-4" src="@/assets/img/startConvIcon.svg" alt="loading" />
          <span class="text-md font-bold">Start a new Conversation</span>
        </button>
        <button
          v-if="showAddContact"
          class="flex gap-6 items-center outline-none"
          @click="goBackToMessages()"
        >
          <img class="w-4" src="@/assets/img/startConvIcon.svg" alt="loading" />
          <span class="text-md font-bold">Go Back</span>
        </button>

        <SearchInput placeholder="search contact" />

        <span class="my-2 text-gray-400 font-bold text-sm"
          >Select Group Members</span
        >
        <!-- starting a conversation screen -->
        <!-- contact list  -->

        <div class="flex flex-col gap-2 overflow-y-auto h-[20%]">
          <div class="" v-for="contact in allContacts" :key="contact.id">
            <div class="flex flex-col gap- w-full">
              <div
                v-if="id != contact.id"
                class="flex gap-4 cursor-pointer"
                @click="selectContactToJoinGroup(contact.tel)"
              >
                <div class="flex">
                  <img
                    class="w-10 z-20"
                    src="@/assets/img/profile.png"
                    alt="loading"
                  />

                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    v-if="roomList.includes(contact.tel)"
                    class="w-10 z-30 absolute"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="20"
                      fill="#EC5237"
                      fill-opacity="0.6"
                    />
                    <path
                      d="M9 22.4898L16.0278 28L31 13"
                      stroke="white"
                      stroke-width="3"
                      stroke-linejoin="round"
                    />
                  </svg>
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
        <button
          v-if="selectContact"
          class="text-red-500 font-semibold flex gap-2 content-center items-center"
          @click="showNameInput()"
        >
          Next
          <img src="@/assets/img/ArrowRight.svg" alt="" />
        </button>
        <button
          v-if="showAddContact"
          class="text-red-500 font-semibold flex gap-2 content-center items-center"
          @click="showAddContactButton()"
        >
          Next
          <img src="@/assets/img/ArrowRight.svg" alt="" />
        </button>
        <!-- end of the screen -->
      </div>

      <!-- start conv  button -->
      <button
        class="md:absolute bottom-0 right-0 z-10"
        @click="startConversation()"
        v-if="showGroups"
      >
        <img src="@/assets/img/chatIcon.svg" alt="" width="100" />
      </button>
    </div>

    <!-- message slot  -->
    <slot></slot>
  </div>
</template>
<style scoped>
.router-link-active {
  background-color: #e4e4e4;
}
</style>
