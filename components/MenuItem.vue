<script lang="ts" setup>
defineProps({
  to: String,
});
</script>
<template>
  <NuxtLink :to="to" class="menu-item block py-2 px-7 cursor-pointer">
    <div class="flex gap-2 items-center text-sm font-semibold">
      <slot></slot>
    </div>
  </NuxtLink>
</template>

