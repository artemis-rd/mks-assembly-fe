<script setup lang="ts">
import Inputlabel from "@/components/LabelInput.vue";
// import { VueTelInput } from "vue-tel-input";
const phone = ref("");
const countryCode = ref("");
const userPhoneNumber = ref("");
const addNumber = ref(true);

function validatePhoneNumber(value: any) {
  let pattern = /^[0-9{6,20}]$/;
  console.log(pattern.test(value));
}
function countyCode(myCode: any) {
  countryCode.value = myCode;
}
function inputValidate(e: any) {
  if (e.valid) {
    userPhoneNumber.value = e.number;
  } else {
    console.log("invalid phone number");
  }
}
function changeToggle() {
  addNumber.value = !addNumber.value;
  console.log(addNumber.value, "valuuuuu");
}
</script>

<template>
  <div class="">
    <TopBar />
    <Transition name="slide-fade">
      <div v-if="addNumber == false" class="flex absolute flex-1 w-10/12 h-full">
        <div @click="changeToggle()" class="bg-slate-500 h-full bg-opacity-10 flex-1"></div>
        <div class="bg-white h-full px-10 w-2/6 gap-5 column">
          <div class="">
            <Inputlabel placeholder="johndoe@gmail.com" label="Firstname" />
          </div>
          <div class="">
            <Inputlabel placeholder="rainbow" label="Lastname" />
          </div>
          <div class="">
            <Inputlabel placeholder="johndoe" label="Operator Lastname" />
          </div>
          <div class="">
            <vue-tel-input v-model="phone" @country-changed="countyCode($event.dialCode)"
              @input="validatePhoneNumber($event.target.value)" @validate="inputValidate($event)">
            </vue-tel-input>
          </div>
          <div class="flex gap-10">
            <button
              class="flex items-center justify-center font-medium rounded-md py-2 px-4 text-white text-sm bg-orange-500">
              Save Changes
            </button>
            <button @click="changeToggle()"
              class="flex items-center justify-center font-medium rounded-md py-2 px-4 text-orange-500 text-sm bg-white">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <div class="pt-5 px-4">
      <div class="flex justify-between items-center">
        <div class="flex w-8/12 justify-between border rounded-lg outline-none py-2 px-2">
          <input class="outline-none text-sm w-full" type="text"
            placeholder="Search Contacts By either Name or Phone Number" />
          <img class="" src="@/assets/img/Search.svg" />
        </div>
        <button @click="changeToggle()"
          class="flex items-center justify-center gap-2 font-medium rounded-md py-2 px-4 text-white text-sm bg-orange-500">
          <img src="@/assets/img/AddUser.svg" alt="" /> Add a New Contact
        </button>
      </div>
    </div>
    <div class="font-bold px-4 mt-2">A</div>
    <div class="px-4 grid grid-cols-3 gap-3">
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
          </div>
        </div>
      </div>
      <div class="flex mt-3 gap-2">
        <div class="w-9 h-9 rounded-full bg-orange">
          <img src="@/assets/img/avatarMessage.svg" alt="" width="100" />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <div class="text-sm font-bold">ICT Office</div>
            <div class="text-sm font-bold">2.49pm</div>
          </div>
          <div class="text-xs text-slate-400">
            Can you confirm whether internet services are....
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
</style>
