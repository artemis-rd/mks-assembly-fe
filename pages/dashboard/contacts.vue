<script setup lang="ts">
import type { Ref } from "vue";

const phone = ref("");
const countryCode = ref("");
const userPhoneNumber = ref("");
const addNumber = ref(true);
const contacts = ref();
const operatorEmail = ref();
const lastName = ref();
const firstName = ref();
const currentPage = ref();
const filteredContacts = ref([]) as Ref<any[]>;
const allContacts: Ref<any> = ref([]);
const contactsFiltered = ref([]) as Ref<any[]>;

const alphabets = ref([
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]) as Ref<any[]>;

const filteredList = ref([]) as Ref<any[]>;
function changeToggle() {
  addNumber.value = !addNumber.value;
}
function sortContacts() {
  for (let i = 0; i < alphabets.value.length; i++) {
    let obj: { header: string; value: any[] } = {
      header: "",
      value: [],
    };
    obj.header = alphabets.value[i];
    obj.value = filteredList.value.filter(
      (x: any) => x.name[0].toUpperCase() == alphabets.value[i]
    );

    filteredContacts.value.push(obj);
  }
}
contactsFiltered.value = filteredContacts.value;
function findContact(e: any) {
  let filters = filteredContacts.value.filter((x: any) => {
    const s = x.value.filter((cat: any) =>
      cat.name.toUpperCase().includes(e.target.value.toUpperCase())
    );
    let r = false;
    s.forEach((element: any) => {
      r = x.value.some(
        (c: any) => c.name.toUpperCase() == element.name.toUpperCase()
      );
    });
    return r;
  });
  contactsFiltered.value = filters;
}
async function createNewContact() {
  let contData = {
    fName: firstName.value,
    lName: lastName.value,
    operatorEmailAddress: operatorEmail.value,
    tel: phone.value,
  };
  let resp = await useCreateContact(contData);
  console.log(resp, "create contact");
}
function onPageChanged(page) {
  currentPage.value = page;
}
// async function getAllContacts() {
//   let resp = await getContacts();
//   console.log(resp, "contee");
// }
async function getContacts() {
  const { MESSAGING_SERVICE } = useRuntimeConfig();
  const cookie = useCookie("mks-token");
  let token = cookie.value;
  // console.log(AUTH_SERVICE_URL, "url");

  let response = await useFetch<any>(`${MESSAGING_SERVICE}/contacts/old/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  allContacts.value = response.data.value;
}
onMounted(async () => {
  await getContacts();
  filteredList.value = allContacts.value;
  sortContacts();
});
</script>

<template>
  <div class="h-screen overflow-y-auto">
    <div class="sticky top-0 bg-white">
      <TopBar />
      <Transition name="slide-fade">
        <div
          v-if="addNumber == false"
          class="flex absolute flex-1 w-10/12 h-full"
        >
          <div
            @click="changeToggle()"
            class="bg-slate-500 h-full bg-opacity-10 flex-1"
          ></div>
          <div class="bg-white h-full px-10 w-2/6 gap-5 column">
            <div class="font-bold pt-5">Add a New Contact</div>
            <div class="">
              <LabelInput
                placeholder="johndoe@gmail.com"
                label="Firstname"
                v-model="firstName"
              />
            </div>
            <div class="">
              <LabelInput
                placeholder="rainbow"
                label="Last Name"
                v-model="lastName"
              />
            </div>
            <div class="">
              <LabelInput
                v-model="phone"
                placeholder="0715565381"
                label="Phone Number"
                type="Number"
              />
            </div>
            <div class="">
              <LabelInput
                placeholder="johndoe"
                label="Operator's Email Address"
                v-model="operatorEmail"
              />
            </div>
            <div class="flex gap-10">
              <button
                class="flex items-center justify-center font-medium rounded-md py-2 px-4 text-white text-sm bg-orange-500"
                @click="createNewContact()"
              >
                Save Changes
              </button>
              <button
                @click="changeToggle()"
                class="flex items-center justify-center font-medium rounded-md py-2 px-4 text-orange-500 text-sm bg-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <div class="pt-5 px-4 ml-6">
        <div class="flex justify-between items-center">
          <div
            class="flex w-8/12 justify-between border rounded-lg outline-none py-2 px-2"
          >
            <input
              @input="findContact($event)"
              class="outline-none text-sm w-full"
              type="text"
              placeholder="Search Contacts By either Name or Phone Number"
            />
            <img class="" src="@/assets/img/Search.svg" />
          </div>
          <button
            @click="changeToggle()"
            class="flex items-center justify-center gap-2 font-medium rounded-md py-2 px-4 text-white text-sm bg-orange-500"
          >
            <img src="@/assets/img/AddUser.svg" alt="" /> Add a New Contact
          </button>
        </div>
      </div>
    </div>

    <div class="ml-8" v-for="group in contactsFiltered">
      <div class="py-3 contact-group" v-if="group.value.length > 0">
        <div class="p-2 font-bold text-xs">{{ group.header }}</div>
        <div class="grid grid-styling gap-3">
          <div class="contact-groups" v-for="contact in group.value">
            <div class="flex mt-3 gap-2">
              <div class="w-9 h-9 rounded-full bg-orange">
                <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
              </div>
              <div class="flex-col">
                <div class="flex justify-between">
                  <div class="text-sm font-bold">
                    {{ contact.name }}
                  </div>
                  <!-- <div class="text-sm font-bold">2.49pm</div> -->
                </div>
                <div class="text-xs text-slate-400">
                  {{ contact.tel }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.grid-styling {
  grid-template-columns: repeat(auto-fit, 320px);
}
</style>
