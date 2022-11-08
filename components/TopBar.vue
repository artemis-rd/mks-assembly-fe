<script setup lang="ts">
import { use } from "h3";

defineProps({
  name: String,
  lastLogin: String,
  user: String,
});
</script>
<template>
  <div class="flex justify-between py-4 border-b border-neutral-100 px-4">
    <div class="">
      <h6 class="font-bold text-xs">{{ name }}</h6>
      <div class="text-xs">{{ lastLogin }}</div>
    </div>
    <div class="flex justify-between items-center gap-8 pr-4">
      <img src="@/assets/img/Search.svg" alt="" />
      <img src="@/assets/img/topdots.svg" alt="" />

      <div class="flex items-center gap-2">
        <img src="@/assets/img/avatartop.svg" alt="" />
        <div class="text-xs font-bold">{{ user }}</div>
      </div>
    </div>
  </div>
</template>
