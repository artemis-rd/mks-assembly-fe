<script setup lang="ts">
defineProps({
  type: String,
  placeholder: String,
  modelValue: String,
});
const emits = defineEmits(["update:modelValue"]);

const updateModel = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emits("update:modelValue", target.value);
};
</script>
<template>
  <div class="flex justify-between border rounded-lg outline-none py-2 px-2">
    <input
      class="outline-none text-sm"
      @input="updateModel($event)"
      :type="type"
      :placeholder="placeholder"
    />
    <img class="" src="@/assets/img/Search.svg" />
  </div>
</template>
