<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})
</script>
<template>
    <section class="text-center text-lg">
        <p>You are home</p>
        <NuxtLink to="dashboard">dashboard</NuxtLink>
    </section>
    
</template>