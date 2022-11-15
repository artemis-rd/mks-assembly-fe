<script setup lang="ts"></script>
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
          <div class="text-5xl">1,044</div>
          <div class="flex items-center">
            <div class="flex">KES 678.60</div>
          </div>
        </div>
        <div class="mt-10 mb-3">
          <button
            class="flex items-center top-up justify-center gap-2 font-medium rounded-md py-2 px-4 text-white text-sm bg-orange-500"
          >
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
            class="flex items-center justify-center gap-2 font-medium rounded-md py-2 px-4 text-orange-500 text-sm bg-orange-100"
          >
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
          <tr class="hover:bg-slate-100 text-xs font-semibold py-12">
            <td>15/10/2022</td>
            <td>QWE234RE1</td>
            <td>0724xxxxx98</td>
            <td>KES 2500</td>
            <td>3000</td>
            <td>
              <button
                class="items-center justify-center font-medium  text-orange-500 border border-orange-500 text-xs px-2 rounded-2xl bg-white"
              >
                Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
