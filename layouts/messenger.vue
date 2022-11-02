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
                <div class="flex gap-2 active:bg-slate-300">
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
                    <p class="text-xs ml-4 font-semibold text-gray-400 mb-1">04.22 p.m</p>
                    <div class="p-4 rounded-bl-none rounded-2xl">
                        <p class="text-xs w-3/4 font-medium">Justo, ac lectus eu vitae. Sed urna metus, amet arcu
                            justo, in tortor massa. Ut donec purus tristique risus mauris. Diam fermentum, iaculis vitae
                            pellentesque sociis diam nulla. Quam nunc tristique ut lacus enim aliquet tempus feugiat
                            senectus. Fermentum nunc pharetra arcu mi,
                        </p>
                    </div>
                    <div class="flex">
                        <div class="w-1/2"></div>
                        <div class="p-4 rounded-2xl  text-cyan-50 bg-red-400 rounded-br-none">

                            <p class="text-xs font-semibold flex justify-end">
                                Leo sed venenatis vestibulum a. Mauris libero vel odio semper. Dictum tempus tellus
                                iaculis est varius hac ultrices. Et amet, lectus vulputate viverra urna sagittis faucib
                            </p>


                        </div>
                    </div>
                    <div class="flex gap-1 text-xs font-semibold text-gray-400 justify-end mt-1">
                        <p>sent</p>
                        <p>04.22 p.m</p>
                    </div>
                    <p class="text-xs ml-4 font-semibold text-gray-400 mb-1">04.22 p.m</p>
                    <div class="p-4 rounded-bl-none rounded-2xl">
                        <p class="text-xs font-semibold w-3/4">Aenean in at amet luctus condimentum vitae cras viverra
                            eget. Vestibulum, tincidunt scelerisque libero e, imperdiet augue orci diam.
                        </p>
                    </div>
                    <p class="text-xs ml-4 font-semibold text-gray-400 mb-1">04.22 p.m</p>
                    <div class="p-4 rounded-bl-none rounded-2xl">
                        <p class="text-xs font-semibold w-3/4">Arcu donec adipiscing orci odio consectetur neque gravida
                            facilisis. Condimentum ut morbi a gravida purus fames ac facilisis. Facilisi aliquet mauris
                            a scelerisque a sem. Ut adipiscing a, tempor ornare mi, molestie quis scelerisque vulputate.
                            Quisque erat amet, donec sed fermentum est.
                        </p>
                    </div>
                    <div class="flex">
                        <div class="w-1/2"></div>
                        <div class="p-4 rounded-2xl  text-cyan-50 bg-red-400 rounded-br-none">

                            <p class="text-xs font-semibold flex justify-end">
                                Leo sed venenatis vestibulum a. Mauris libero vel odio semper. Dictum tempus tellus
                                iaculis est varius hac ultrices. Et amet, lectus vulputate viverra urna sagittis faucib
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