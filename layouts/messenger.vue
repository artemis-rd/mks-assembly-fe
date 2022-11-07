<script setup>
const directThreads = ref({})
const {
    public: { AUTH_SERVICE_URL },
} = useRuntimeConfig();

onMounted(async () => {
    await getThreads();
})
async function getThreads() {
    try {
        const threads = useFetch < any > (`${AUTH_SERVICE_URL}/threads`, {
            method: 'GET',
            body: directThreads
        });
        console.log(threads);
    }
    catch {

    }
}

</script>
<template>
    <div class="flex">
        <div class="mx-2 my-3 mb-0 container max-w-max">
            <h2 class="text-lg font-bold my-5 mb-2">Messenger</h2>
            <SearchInput />

            <!-- direct messages -->
            <div class="my-1 text-sm">
                <p class="my-5 font-bold text-sm text-gray-700">Direct Messages</p>
                <div class="flex gap-2 my-4">
                    <img class="" src="@/assets/img/profile.png" alt="loading">
                    <NuxtLink to="/dashboard/messenger/directMessage" class="flex-col">
                        <div class="flex justify-between">
                            <p class="font-bold text-gray-700">Baraka sean</p>
                            <p class="text-sm font-medium text-gray-700">4.14 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">Hello, can you check whether everything is okay...
                        </p>
                    </NuxtLink>
                </div>
                <!-- thread two -->
                <NuxtLink activeClass="active:bg-slate-300" to="/dashboard/messenger/directMessage" class="flex gap-2 active:bg-slate-300 my-4">
                    <img class="" src="@/assets/img/user2.png" alt="loading">
                    <div class="flex-col">
                        <div class="flex justify-between">
                            <p class=" text-gray-700 font-bold">Paul Davidson</p>
                            <p class="text-sm font-medium text-gray-700">3.10 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">I think we have a problem with the drainage....
                        </p>
                    </div>
                </NuxtLink>
                <!-- thread three -->
                <NuxtLink to="/dashboard/messenger/directMessage" class="flex gap-2 active:bg-slate-300">
                    <img class="" src="@/assets/img/user3.png" alt="loading">
                    <div class="flex-col">
                        <div class="flex justify-between">
                            <p class=" text-gray-700 font-bold">ICT Office</p>
                            <p class="text-sm font-medium text-gray-700">2.49 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">Can you confirm whether internet services are....
                        </p>
                    </div>
                </NuxtLink>
            </div>

            <!-- group messages -->
            <div class="my-1 text-sm">
                <p class="my-5 font-bold text-sm text-gray-700">Group Messages</p>
                <NuxtLink to="/dashboard/messenger/groupMessages" class="flex gap-2 my-4">
                    <img class="" src="@/assets/img/group1.svg" alt="loading">
                    <div class="flex-col">
                        <div class="flex justify-between">
                            <p class=" text-gray-700 font-semibold">House Business Comm</p>
                            <p class="text-sm font-medium text-gray-700">4.14 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">Hello, can you check whether everything is okay...
                        </p>
                    </div>
                </NuxtLink>
                <!-- thread two -->
                <NuxtLink to="/dashboard/messenger/groupMessages" class="flex gap-2 active:bg-slate-300 my-4">
                    <img class="" src="@/assets/img/group2.svg" alt="loading">
                    <div class="flex-col">
                        <div class="flex justify-between">
                            <p class=" text-gray-700 font-semibold">Finance Department</p>
                            <p class="text-sm font-medium text-gray-700">3.10 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">I think we have a problem with the drainage....
                        </p>
                    </div>
                </NuxtLink>
                <!-- thread group three -->
                <NuxtLink to="/dashboard/messenger/groupMessages" class="flex gap-2 active:bg-slate-300 my-4">
                    <img class="" src="@/assets/img/group3.svg" alt="loading">
                    <div class="flex-col">
                        <div class="flex justify-between">
                            <p class=" text-gray-700 font-semibold">Lands And Energy</p>
                            <p class="text-sm font-medium text-gray-700">2.49 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">Can you confirm whether internet services are....
                        </p>
                    </div>
                </NuxtLink>

                <!-- thread group three -->
                <NuxtLink to="/dashboard/messenger/groupMessages" class="flex gap-2 active:bg-slate-300">
                    <img class="" src="@/assets/img/group4.svg" alt="loading">
                    <div class="flex-col">
                        <div class="flex justify-between">
                            <p class=" text-gray-700 font-semibold">ICT Directorate</p>
                            <p class="text-sm font-medium text-gray-700"> Saturday 2.49 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">Can you confirm whether internet services are....
                        </p>
                    </div>
                </NuxtLink>

            </div>
        </div>
      <slot></slot>

    </div>

</template>