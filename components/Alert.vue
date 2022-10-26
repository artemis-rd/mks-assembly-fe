<script setup lang="ts">
const props = defineProps({
    visible: Boolean
})
onMounted(() => {
    shown.value = true
})
const shown = ref(false)
setTimeout(() => {
    if (props.visible) shown.value = false
}, 5000);
</script>
<template>
    <div v-if="shown" class="animate-bounce transition ease-in-out alert-box absolute inset-x-0 top-20 min-w-full inline-flex justify-center">
        <div class="alert-container min-w-fit px-3 py-2 leading-none shadow-lg shadow-neutral-100 rounded-full bg-orange-100 inline-flex items-center" role="alert">
            <span class="uppercase text-xs px-2 py-1 rounded-full bg-orange-200 font-bold mr-3 text-orange-500">Oops</span>
            <slot></slot>
        </div>
    </div>
    
</template>