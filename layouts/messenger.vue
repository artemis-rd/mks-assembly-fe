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
        <div class="mx-2 my-3 mb-0 container w-1/2">
            <h2 class="text-lg font-bold my-5 mb-2">Messenger</h2>
            <SearchInput />

            <!-- direct messages -->
            <div class="my-1 text-sm">
                <p class="my-5 font-bold text-xs">Direct Messages</p>
                <div class="flex gap-2 my-4">
                    <img class="" src="@/assets/img/profile.png" alt="loading">
                    <div class="flex-col">
                        <div class="flex justify-between">
                            <p class=" text-black font-bold">Baraka sean</p>
                            <p class="text-sm font-semibold">4.14 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit....
                        </p>
                    </div>
                </div>
                <!-- thread two -->
                <div class="flex gap-2">
                    <img class="" src="@/assets/img/profile.png" alt="loading">
                    <div class="flex-col">
                        <div class="flex justify-between">
                            <p class=" text-black font-bold">Baraka sean</p>
                            <p class="text-sm font-semibold">4.14 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit....
                        </p>
                    </div>
                </div>

            </div>


        </div>
        <div class="w-full ml-2 ">
            <div class="flex justify-between mx-4 my-4">
                <div class="flex-col">
                    <p class="text-sm font-semibold">Paul Davidson</p>
                    <p class="text-xs text-gray-400">Last seen 04.45 p.m</p>
                </div>
                <div class="">
                    <div class="flex gap-8 items-center">
                        <img class="w-4 h-4" src="@/assets/img/Search.svg" alt="loading">
                        <p>:</p>
                        <div class="flex gap-1 items-center">
                            <img class="w-8 h-8" src="@/assets/img/user.png" alt="" />
                            <p class="text-xs font-bold">Angel Mwende</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="border-t border-gray-300">
                <p class="text-gray-200 text-center font-semibold my-5 text-sm">The start of your conversation with Paul
                </p>
                <div class="flex-col gap-2 mx-3">
                    <div class="p-4">
                        <p class="text-xs font-semibold text-gray-400 mb-1">04.22 p.m</p>
                        <p class="text-xs font-semibold w-3/4">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Dolorum rem dolore quod.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor pariatur rem voluptatibus
                            laborum, nostrum perspiciatis.
                            Consequatur voluptates quod, commodi molestias nostrum suscipit veniam, facilis animi
                            doloremque eaque, maiores omnis nesciunt.
                        </p>
                    </div>
                    <div class="flex"> 
                        <div class="w-1/2"></div>
                        <div class="p-4 rounded-lg border-r-0 text-cyan-50 bg-red-400">
                           
                            <p class="text-xs font-semibold flex justify-end">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Ipsa
                                beatae repellat voluptatem!
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est ab assumenda sunt
                                voluptates
                                provident animi
                                ipsa repudiandae eius commodi libero rem modi quis a nostrum, quidem quam inventore
                                porro
                                magnam!
                            </p>


                        </div>
                    </div>
                    <div class="flex gap-1 text-xs font-semibold text-gray-400 justify-end mt-1">
                        <p>sent</p>
                        <p>04.22 p.m</p>
                    </div>
                </div>
            </div>
        </div>

        <slot></slot>
    </div>

</template>