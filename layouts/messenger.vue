<script setup lang="ts">
import { Ref } from "vue";
const receiverCont = useState("receiverContact");
const directThreads = ref({});
const allContacts: Ref<any> = ref([]);

const {
  public: { MESSAGING_SERVICE },
} = useRuntimeConfig();

onMounted(async () => {
  await getThreads();
  await getContacts();
});
async function getContacts() {
  const { MESSAGING_SERVICE } = useRuntimeConfig();
  const cookie = useCookie("mks-token");
  let token = cookie.value;
  // console.log(AUTH_SERVICE_URL, "url");

  let response = await useFetch<any>(`${MESSAGING_SERVICE}/contacts/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  allContacts.value = response.data.value;
  // console.log(response.data.value, "sesponseee");
  // console.log(response, "sespo");
}
async function getThreads() {
  try {
    const token = useCookie('mks-token');
    const id = JSON.parse(window.atob(token.value.split('.')[1])).id
    console.log('getting chats for', id);
    const { data, error } = await useFetch<any>(`${MESSAGING_SERVICE}/chats/list/${id}`, {
      method: "GET",
    });
    console.log('the chats',data.value);
  } catch(err) {
    console.log('chat threads error', err)
  }
}

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
  selected.value = true
  if (selected.value = true) {
    let contactList = contactSelected.value.push(selectContact.value);
   await getContacts()
   let myContacts  = allContacts.value
    for (let x of myContacts) {
      console.log(x.phoneNumber, "contact number");
      
    }
  let listLength = contactSelected.value.length;

  }
  console.log(`Contact to selected value: ${selected.value}`);


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
      <div class="my-1 text-sm">
        <p class="my-5 font-bold text-sm text-gray-700">Direct Messages</p>
        <div class="flex gap-2 my-4">
          <img class="" src="@/assets/img/profile.png" alt="loading" />
          <NuxtLink to="/dashboard/messenger/dm/22" class="flex-col">
            <div class="flex justify-between">
              <p class="font-bold text-gray-700">Baraka sean</p>
              <p class="text-sm font-medium text-gray-700">4.14 p.m</p>
            </div>
            <p class="text-xs text-gray-400">
              Hello, can you check whether everything is okay...
            </p>
          </NuxtLink>
        </div>
        <!-- thread two -->
        <NuxtLink activeClass="active:bg-slate-300" to="/dashboard/messenger/dm/23"
          class="flex gap-2 active:bg-slate-300 my-4">
          <img class="" src="@/assets/img/user2.png" alt="loading" />
          <div class="flex-col">
            <div class="flex justify-between">
              <p class="text-gray-700 font-bold">Paul Davidson</p>
              <p class="text-sm font-medium text-gray-700">3.10 p.m</p>
            </div>
            <p class="text-xs text-gray-400">
              I think we have a problem with the drainage....
            </p>
          </div>
        </NuxtLink>
        <!-- thread three -->
        <NuxtLink to="/dashboard/messenger/dm/24" class="flex gap-2 active:bg-slate-300">
          <img class="" src="@/assets/img/user3.png" alt="loading" />
          <div class="flex-col">
            <div class="flex justify-between">
              <p class="text-gray-700 font-bold">ICT Office</p>
              <p class="text-sm font-medium text-gray-700">2.49 p.m</p>
            </div>
            <p class="text-xs text-gray-400">
              Can you confirm whether internet services are....
            </p>
          </div>
        </NuxtLink>
        <!-- thread four -->
        <NuxtLink activeClass="active:bg-slate-300" to="/dashboard/messenger/dm/25"
          class="flex gap-2 active:bg-slate-300 my-4">
          <img class="" src="@/assets/img/HonSpeaker.svg" alt="loading" />
          <div class="flex-col">
            <div class="flex justify-between">
              <p class="text-gray-700 font-bold">Hon. Speaker</p>
              <p class="text-sm font-medium text-gray-700">2.20 p.m</p>
            </div>
            <p class="text-xs text-gray-400">
              Tommorrows meeting will start at 10.50 a.m ....
            </p>
          </div>
        </NuxtLink>
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
        <NuxtLink to="/dashboard/messenger/groups/2" class="flex gap-2 active:bg-slate-300 my-4">
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
        <NuxtLink to="/dashboard/messenger/groups/3" class="flex gap-2 active:bg-slate-300 my-4">
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
        <NuxtLink to="/dashboard/messenger/groups/4" class="flex gap-2 active:bg-slate-300">
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
          <img src="@/assets/img/chatIcon.svg" alt="" />
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
        <img class="w-6" src="@/assets/img/createContactIcon.svg" alt="loading" />
        <span class="text-red-500 font-xs font-semibold">Create a new Group</span>
      </button>
      <span class="my-4 text-gray-400 font-bold text-sm">Send Direct Message</span>
      <!-- starting a conversation screen -->
      <!-- contact list  -->
      <div class="">
        <div class="flex flex-col" v-for="contact in allContacts" :key="contact.id">
          <div class="flex flex-col gap-4 w-full pb-2">
            <NuxtLink to="/dashboard/messenger/directMessage" class="flex gap-4" @click="sendContactdata(contact.id)">
              <img class="w-10" src="@/assets/img/profile.png" alt="loading" />
              <div class="gap-2">
                <p class="text-sm font-bold">
                  {{ contact.fName }} {{ contact.lName }}
                </p>
                <span class="text-xs font-semibold text-gray-400">{{
                    contact.phoneNumber
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
      <button class="flex gap-6 items-center outline-none" @click="goBackToStartConv()">
        <img class="w-4" src="@/assets/img/startConvIcon.svg" alt="loading" />
        <span class="text-md font-bold">Start a new Conversation</span>
      </button>

      <SearchInput />

      <span class="my-4 text-gray-400 font-bold text-sm">Select Group Members</span>
      <!-- starting a conversation screen -->
      <!-- contact list  -->
      <div class="flex flex-col gap-2 overflow-y-auto h-3/5">
        <div class="" v-for="contact in allContacts" key="contact.phoneNumber">
          <div class="flex flex-col gap- w-full">
            <div class="flex gap-4" @click="selectContactToJoinGroup()">
              <img class="w-10" src="@/assets/img/profile.png" alt="loading" />
              <div class="gap-2">
                <p class="text-sm font-bold">{{ contact.fName }} {{ contact.lName }}</p>
                <span class="text-xs font-semibold text-gray-400">{{ contact.phoneNumber }}</span>
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
<style scoped>

</style>
