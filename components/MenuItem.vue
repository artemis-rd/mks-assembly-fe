<script lang="ts" setup>
defineProps({
  to: String,
});
</script>
<template>
  <NuxtLink :to="to" class="menu-item block py-4 px-7 cursor-pointer hover:bg-orange-100 hover:border-r-[3px] hover:border-orange-500">
    <div class="flex gap-2 items-center text-sm font-semibold">
      <slot></slot>
    </div>
  </NuxtLink>
</template>

