<script setup lang="ts">
const senderId = ref();
const cookie = useCookie("mks-token");
const token = cookie.value;
let brokenToken = token.split(".")[1];
senderId.value = JSON.parse(atob(brokenToken)).id;
const { MESSAGING_SERVICE } = useRuntimeConfig();
const toggelShowContacts = useState<boolean>("toggleShow", () => false);
function changeToggle() {
  toggelShowContacts.value = !toggelShowContacts.value;
}

defineProps({
  name: String,
  lastLogin: String,
  user: String,
});
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
const { data: userDetails } = await useFetch<any>(
  `${MESSAGING_SERVICE}/contacts/old/list/${senderId.value}`
);
const logedUser = userDetails.value.name;
</script>
<template>
  <div class="flex justify-between py-4 border-b border-neutral-100 px-4">
    <div class="">
      <h6 class="font-bold text-xs">{{ capitalizeName(name) }}</h6>
      <div class="text-xs">{{ lastLogin }}</div>
    </div>
    <div class="flex justify-between items-center gap-8 pr-4">
      <img src="@/assets/img/Search.svg" alt="" />
      <img
        src="@/assets/img/topdots.svg"
        class="cursor-pointer px-4"
        alt=""
        @click="changeToggle()"
      />

      <div class="flex items-center gap-2">
        <img src="@/assets/img/useravatar.svg" alt="" />
        <div class="text-xs font-bold">{{ capitalizeName(logedUser) }}</div>
      </div>
    </div>
  </div>
</template>
