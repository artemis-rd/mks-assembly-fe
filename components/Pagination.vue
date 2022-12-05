<script setup lang="ts">
import { Ref } from 'vue';

const {
  public: { MESSAGING_SERVICE },
} = useRuntimeConfig();
const listPayment = useState("receivedPayment")
const count = [
    1, 2, 3, 4
]
const list:Ref<any[]> = ref([])

const currentPage = ref()
const pageSize = ref(6)
const  { data: paymentList } = await useFetch<any>(`${MESSAGING_SERVICE}/payment/list`,{
    method:"GET",
    key: Math.ceil(Math.random() * 1000).toString(),
    params: {
        page:currentPage.value,
        take:pageSize.value
    }
}
)
console.log('the list of payments', paymentList.value);
const numberOfPages = ref()
// listPayment.value = paymentList.value
// console.log(listPayment.value, "payment list");


function prevPage(){
currentPage.value++
}
function nextPage(){
}

</script>
<template>
    <div class="  absolute bottom-0 border-t-[1px] w-full border-gray-500">
        <div class="flex gap-2 items-center mt-2">
            {{paymentList}}
            <div class="flex gap-2 font-bold" v-for="transaction in paymentList.paymentsList">
                <span>Showing</span>
                <span>{{transaction.page}}</span>
                <span>of</span>
                <span>{{transaction.paymentsCount}}</span>
            </div>
            <!-- previous -->
            <div class="flex gap-2">
                <button 
                    @click="prevPage()"
                    class="flex items-center gap-2 bg-orange-200 px-4 py-2 rounded-lg text-orange-500 font-semibold">
                    <img class="w-2" src="@/assets/img/previousIcon.svg" alt="loading">
                    <span>Previous</span>
                </button>
                <button @click="nextPage()" class="flex items-center gap-2 bg-orange-200 px-4 rounded-lg text-orange-500 font-semibold">
                    <span>Next</span>
                    <img class="w-2" src="@/assets/img/nextIcon.svg" alt="loading">
                </button>

            </div>
            <NuxtLink
                class=" hover:bg-orange-500 font-semibold hover:rounded-[100%] hover:w-4 p-[4px] hover:text-blue-50"
                v-for="pageCount in count" key="pageCount">{{ pageCount }}</NuxtLink>

        </div>
    </div>
</template>