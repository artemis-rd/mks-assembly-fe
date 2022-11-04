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
                <p class="my-5 font-bold text-sm text-gray-700">Direct Messages</p>
                <div class="flex gap-2 my-4">
                    <img class="" src="@/assets/img/profile.png" alt="loading">
                    <div class="flex-col">
                        <div class="flex justify-between">
                            <p class="font-bold text-gray-700">Baraka sean</p>
                            <p class="text-sm font-medium text-gray-700">4.14 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">Hello, can you check whether everything is okay...
                        </p>
                    </div>
                </div>
                <!-- thread two -->
                <div class="flex gap-2 active:bg-slate-300 my-4">
                    <img class="" src="@/assets/img/user2.png" alt="loading">
                    <div class="flex-col">
                        <div class="flex justify-between">
                            <p class=" text-gray-700 font-bold">Paul Davidson</p>
                            <p class="text-sm font-medium text-gray-700">3.10 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">I think we have a problem with the drainage....
                        </p>
                    </div>
                </div>
                <!-- thread three -->
                <div class="flex gap-2 active:bg-slate-300">
                    <img class="" src="@/assets/img/user3.png" alt="loading">
                    <div class="flex-col">
                        <div class="flex justify-between">
                            <p class=" text-gray-700 font-bold">ICT Office</p>
                            <p class="text-sm font-medium text-gray-700">2.49 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">Can you confirm whether internet services are....
                        </p>
                    </div>
                </div>


            </div>

             <!-- group messages -->
             <div class="my-1 text-sm">
                <p class="my-5 font-bold text-sm text-gray-700">Group Messages</p>
                <div class="flex gap-2 my-4">
                    <img class="" src="@/assets/img/group1.svg" alt="loading">
                    <div class="flex-col">
                        <div class="flex justify-between">
                            <p class=" text-gray-700 font-semibold">House Business Comm</p>
                            <p class="text-sm font-medium text-gray-700">4.14 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">Hello, can you check whether everything is okay...
                        </p>
                    </div>
                </div>
                <!-- thread two -->
                <div class="flex gap-2 active:bg-slate-300 my-4">
                    <img class="" src="@/assets/img/group2.svg" alt="loading">
                    <div class="flex-col">
                        <div class="flex justify-between">
                            <p class=" text-gray-700 font-semibold">Finance Department</p>
                            <p class="text-sm font-medium text-gray-700">3.10 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">I think we have a problem with the drainage....
                        </p>
                    </div>
                </div>
                <!-- thread group three -->
                <div class="flex gap-2 active:bg-slate-300 my-4">
                    <img class="" src="@/assets/img/group3.svg" alt="loading">
                    <div class="flex-col">
                        <div class="flex justify-between">
                            <p class=" text-gray-700 font-semibold">Lands And Energy</p>
                            <p class="text-sm font-medium text-gray-700">2.49 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">Can you confirm whether internet services are....
                        </p>
                    </div>
                </div>
   
                 <!-- thread group three -->
                 <div class="flex gap-2 active:bg-slate-300">
                    <img class="" src="@/assets/img/group4.svg" alt="loading">
                    <div class="flex-col">
                        <div class="flex justify-between">
                            <p class=" text-gray-700 font-semibold">ICT Directorate</p>
                            <p class="text-sm font-medium text-gray-700"> Saturday 2.49 p.m</p>
                        </div>
                        <p class=" text-xs text-gray-400">Can you confirm whether internet services are....
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
            <div class="border-y border-gray-300">
                <p class="text-gray-200 text-center font-semibold my-5 text-sm">The start of your conversation with Paul
                </p>
                <div class="flex-col gap-2 mx-3">
                    <p class="text-xs ml-4 font-semibold text-gray-400 mb-1">04.22 p.m</p>
                    <div class="p-3 rounded-bl-none rounded-2xl">
                        <p class="text-xs w-3/4 font-medium">Justo, ac lectus eu vitae. Sed urna metus, amet arcu
                            justo, in tortor massa. Ut donec purus tristique risus mauris. Diam fermentum, iaculis vitae
                            pellentesque sociis diam nulla. Quam nunc tristique ut lacus enim aliquet tempus feugiat
                            senectus. Fermentum nunc pharetra arcu mi,
                        </p>
                    </div>
                    <div class="flex">
                        <div class="w-1/2"></div>
                        <div class="p-3 rounded-2xl  text-cyan-50 bg-red-400 rounded-br-none">

                            <p class="text-xs font-medium flex justify-end">
                                Leo sed venenatis vestibulum a. Mauris libero vel odio semper. Dictum tempus tellus
                                iaculis est varius hac ultrices. Et amet, lectus vulputate viverra urna sagittis faucib
                            </p>


                        </div>
                    </div>
                    <div class="flex gap-1 text-xs font-semibold text-gray-400 justify-end mt-1">
                        <p>sent</p>
                        <p>04.22 p.m</p>
                    </div>
                    <p class="text-xs ml-4 font-semibold text-gray-400 mb-0">04.22 p.m</p>
                    <div class="p-3 rounded-bl-none rounded-2xl">
                        <p class="text-xs font-medium w-3/4">Aenean in at amet luctus condimentum vitae cras viverra
                            eget. Vestibulum, tincidunt scelerisque libero e, imperdiet augue orci diam.
                        </p>
                    </div>
                    <p class="text-xs ml-4 font-semibold text-gray-400 mb-0">04.22 p.m</p>
                    <div class="p-3 rounded-bl-none rounded-2xl">
                        <p class="text-xs font-medium w-3/4">Arcu donec adipiscing orci odio consectetur neque gravida
                            facilisis. Condimentum ut morbi a gravida purus fames ac facilisis. Facilisi aliquet mauris
                            a scelerisque a sem. Ut adipiscing a, tempor ornare mi, molestie quis scelerisque vulputate.
                            Quisque erat amet, donec sed fermentum est.
                        </p>
                    </div>
                    <div class="flex">
                        <div class="w-1/2"></div>
                        <div class="p-3 rounded-2xl  text-cyan-50 bg-red-400 rounded-br-none">

                            <p class="text-xs font-medium flex justify-end">
                                Consectetur eget arcu, libero, commodo, cras id hendrerit sagittis. Amet condimentum
                                orci.
                            </p>

                        </div>
                    </div>
                    <div class="flex gap-1 text-xs font-semibold text-gray-400 justify-end my-2">
                        <p>sent</p>
                        <p>04.22 p.m</p>
                    </div>
                </div>
            </div>
            <div class=" flex gap-4 items-center"> 
                <textarea placeholder="Type something here ...." class="w-3/4 mt-2 outline-none"/>
                <div class="flex items-center gap-4">
                    <p  class="text-red-500 text-sm font-medium">Send Message</p>
                    <img class=" w-4" src="@/assets/img/sent.svg" alt="loading">
                </div>
            </div>
           
        </div>

        <slot></slot>
    </div>

</template>