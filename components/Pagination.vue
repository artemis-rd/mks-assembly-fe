<!-- <script setup lang="ts">
const changingData = defineProps({
  maxVisibleButtons: Number,
  totalPages: Number,
  perPage: Number,
  currentPage: Number,
});
computed(() => {
  function startPage() {
    // When on the first page
    if (changingData.currentPage === 1) {
      return 1;
    }

    // When on the last page
    if (changingData.currentPage === changingData.totalPages) {
      return changingData.totalPages - changingData.maxVisibleButtons;
    }

    // When inbetween
    return changingData.currentPage - 1;
  }

  function isInFirstPage() {
    return changingData.currentPage === 1;
  }
  function isInLastPage() {
    return changingData.currentPage === changingData.totalPages;
  }
});
function pages() {
  const range = [];

  for (
    let i = startPage;
    i <=
    Math.min(
      startPage + changingData.maxVisibleButtons - 1,
      changingData.totalPages
    );
    i++
  ) {
    range.push({
      name: i,
      isDisabled: i === changingData.currentPage,
    });
  }

  return range;
}
function onClickFirstPage() {
  $emit("pagechanged", 1);
}
function onClickPreviousPage() {
  $emit("pagechanged", changingData.currentPage - 1);
}
function onClickPage(page) {
  $emit("pagechanged", page);
}
function onClickNextPage() {
  $emit("pagechanged", changingData.currentPage + 1);
}
function onClickLastPage() {
  $emit("pagechanged", changingData.totalPages);
}
function isPageActive(page) {
  return changingData.currentPage === page;
}
</script>
<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
        First
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
      >
        Prev
      </button>
    </li>

   

    <li v-for="page in pages" class="pagination-item" :key="page.name">
      <button
        type="button"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
      >
        {{ page.name }}
      </button>
    </li>

  

    <li class="pagination-item">
      <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
        Next
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
        Last
      </button>
    </li>
  </ul>
</template>

<style scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  color: #fff;
  font-weight: bold;
  background: var(--pr-color);
}
.pagination .pagination-item button {
  padding: 1px;
  width: 3rem;
  margin-right: 3px;
  border-radius: 4px;
}
</style> -->
