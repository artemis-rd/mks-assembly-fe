<script setup lang="ts">
function onPageChange(page: number) {
  if (page) currentPage.value = page
}
const {
  public: { MESSAGING_SERVICE },
} = useRuntimeConfig();

const currentPage = ref(1)
const pageSize = ref(6)
//  i mean reset to base.. hiyo ni kama bado kuna any conflicts, sasa ukireset to base, iarudi venye ilikuwa before pull
// kwani bado kuna conflicts ? nope tu 0 ata .. ooh, ni sawa,
// imerun poa kwako ? bado .. ikona error gani ?

const { data: paymentList, refresh: refreshList } = await useFetch<any>(`${MESSAGING_SERVICE}/payment/list`, {
  method: "GET",
  key: currentPage.value.toString(),
  params: {
    page: currentPage.value,
    take: pageSize.value
  }
})
const paymentCount = Math.ceil(paymentList.value.paymentsCount/ pageSize.value)
watch(currentPage, async (newVal) => {
  const { data } = await useFetch<any>(`${MESSAGING_SERVICE}/payment/list`, {
    method: "GET",
    key: newVal.toString(),
    params: {
      page: currentPage.value,
      take: pageSize.value
    }
  })
  paymentList.value = data.value
})

type messagesBalances = {
  id: string;
  smsBalance: number;
};
const { data: messagesBallance, refresh: refreshBallance } =
  await useFetch<messagesBalances>(
    `${MESSAGING_SERVICE}/accounts/list/mks-assembly`,
    {
      method: "GET",
      key: Math.floor(Math.random() * 1000).toString(),
    }
  );
const { data: allTransactions, refresh: refreshTransactions } = await useFetch<
  any[]
>(`${MESSAGING_SERVICE}/payments/list`, {
  body: { page: 1, take: 10 },
  method: "GET",
  key: Math.floor(Math.random() * 1000).toString(),
});

let balance = messagesBallance.value;
let availableMoney = Math.floor(balance.smsBalance / 0.65);
</script>
<template>
  <div class="">
    <div class="top">
      <TopBar user="Angel Mwende" name="Billing" />
    </div>
    <div class="main-div flex pr-3 pt-4 mr-16 pl-10">
      <div class="left-main flex-1">
        <div class="pt-6 font-bold">Available SMS Balance</div>
        <div class="pt-2 text-sm">
          The number of SMS the system is able to send
        </div>
        <div class="pt-5 flex gap-4 font-bold">
          <div class="text-5xl">{{ availableMoney }}</div>
          <div class="flex items-center">
            <div class="flex">KES {{ balance.smsBalance }}</div>
          </div>
        </div> 
        <div class="mt-10 mb-3">
          <button
            class="flex items-center top-up justify-center gap-2 font-medium rounded-md py-2 px-4 text-white text-sm bg-orange-500">
            Top Up Account
          </button>
        </div>
      </div>
      <div class="right-main">
        <img src="@/assets/img/billingIlustration.svg" alt="" width="450" />
      </div>
    </div>
    <div class="middle-main pl-10">
      <div class="mb-2">Payment History</div>
      <div class="flex gap-10 items-center">
        <div class="w-2/6">
          <SearchInput placeholder="search transaction history" type="text" />
        </div>
        <div class="">
          <button
            class="flex items-center justify-center gap-2 font-medium rounded-md py-2 px-4 text-orange-500 text-sm bg-orange-100">
            <img src="@/assets/img/pdf.svg" alt="" /> Export as PDF
          </button>
        </div>
      </div>
    </div>
    <div class="table w-full mt-4 pl-10">
      <table class="w-full">
        <thead>
          <tr class="text-slate-300">
            <th>Date</th>
            <th>transaction</th>
            <th>Tel</th>
            <th>Amount</th>
            <th>SMS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-slate-100 text-xs font-semibold py-12" v-for="transcation in paymentList.paymentsList">
            <td>{{ transcation.createdAt }}</td>
            <td>{{ JSON.parse(transcation.payment).TransID }}</td>
            <td>{{ JSON.parse(transcation.payment).MSISDN }}</td>
            <td>KES {{ JSON.parse(transcation.payment).TransAmount }}</td>
            <td>{{ Math.floor(parseInt(JSON.parse(transcation.payment).TransAmount) / 0.65) }}</td>
            <td>
              <button
                class="items-center justify-center font-medium  text-orange-500 border border-orange-500 text-xs px-2 rounded-2xl bg-white">

                Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <pagination style="margin-top: 1rem" :totalPages="paymentCount" :currentPage="currentPage"
        @goToPage="onPageChange($event)" />
    </div>
  </div>
</template>
<style scoped>
.top-up {
  box-shadow: 0px 1px 10px 2px rgba(0, 0, 0, 0.15);
}

th {
  text-align: left;
}

td {
  padding: 0.8em 0;
}
</style>
