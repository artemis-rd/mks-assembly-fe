<script setup lang="ts">
import { Ref } from 'vue';

const props = defineProps({
  currentPage: Number,
  totalPages: Number
})

const emit = defineEmits(['goToPage'])

const previousPage = () => {
    let p = props.currentPage - 1;
    if (p > 1) {
        emit('goToPage', p);
    } else emit('goToPage', 1)
}

const nextPage = () => {
    let n = props.currentPage + 1;
    if (n > props.totalPages) {
        emit('goToPage', 1)
    }
    else
    emit('goToPage', n)
}

</script>
<template>
    <div class="   bottom-0 border-t-[1px] w-full border-gray-500">
        <div class="flex gap-2 items-center mt-2">
            <div class="flex gap-2 font-bold" >
                <span>Showing</span>
                <span :currentPage="currentPage">{{}}</span>
                <span>of</span>
                <span :totalPages="totalPages">{{}}</span>
            </div>
            <!-- previous -->
            <div class="flex gap-2">
                <button 
                    @click="previousPage"
                    class="flex items-center gap-2 bg-orange-200 px-4 py-2 rounded-lg text-orange-500 font-semibold">
                    <img class="w-2" src="@/assets/img/previousIcon.svg" alt="loading">
                    <span>Previous</span>
                </button>
                <button @click="nextPage" class="flex items-center gap-2 bg-orange-200 px-4 rounded-lg text-orange-500 font-semibold">
                    <span>Next</span>
                    <img class="w-2" src="@/assets/img/nextIcon.svg" alt="loading">
                </button>

            </div>
            <NuxtLink
                class=" hover:bg-orange-500 font-semibold hover:rounded-[100%] hover:w-4 p-[4px] hover:text-blue-50"
                v-for="pageCount in totalPages" key="pageCount">{{ pageCount }}</NuxtLink>

        </div>
    </div>
</template>