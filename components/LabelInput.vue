<script setup lang="ts">
defineProps({
    type: String,
    label: String,
    placeholder: String
})
</script>

<template>
    <div class="labeled-input my-2">
        <label class="text-sm font-semibold block">{{label}}</label>
        <input class="container min-w-auto p-2 my-1 border rounded-lg text-sm" :type="type" :placeholder="placeholder" />
    </div>
</template>