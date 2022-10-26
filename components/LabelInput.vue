<script setup lang="ts">
defineProps({
    type: String,
    label: String,
    placeholder: String,
    modelValue: String
});
const emits = defineEmits(['update:modelValue']);

const updateModel = (event: Event) => {
    const target = event.target as HTMLInputElement
    emits('update:modelValue', target.value)
}
</script>

<template>
    <div class="labeled-input my-4">
        <label class="text-sm font-semibold block">{{label}}</label>
        <input @input="updateModel($event)" class="container min-w-auto px-3 py-2 my-1 border rounded-lg text-sm" :type="type" :placeholder="placeholder" />
    </div>
</template>