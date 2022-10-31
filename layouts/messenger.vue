<script setup>

</script>
<template>
    <div class="flex">
        <div class="ml-6 my-3 mb-0 container">
            <h2 class="text-lg font-bold my-5 mb-2">Messenger</h2>
            <SearchInput />

            <!-- direct messages -->
            <div class="my-1 text-sm">
                <p class="my-5 font-bold text-xs">Direct Messages</p>
                <div class="flex gap-2">
                    <img class=" w-30" src="@/assets/img/profile.png" alt="loading">
                    <div class="flex-col">
                        <div class="flex justify-between">
                            <p class=" text-black font-bold">Baraka sean</p>
                            <p class="text-sm font-semibold">4.14 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit....</p>
                    </div>
                </div>

            </div>


        </div>
        <slot></slot>
    </div>

</template>