<script setup lang="ts">

import type {Ref} from "vue";

definePageMeta({
  middleware: ['auths', 'auth-logged-in'],
})

const authStore = useAuthStore();

const date = ref(undefined)
const dayjs = useDayjs();

const query = computed(() => ({
  date_start: dayjs(date.value).startOf('month').format('YYYY-MM-DD'),
  date_end: dayjs(date.value).endOf('month').format('YYYY-MM-DD'),
}))


const {
  data: report,
  pending,
  refresh
} = useFetch(`/api/reports`, {
  query
}) as any as {
  data: Ref<{
    groupedCashflow: {
      INCOME: {
        total: string,
        type: "INCOME"
      },
      EXPENSE: {
        total: string,
        type: "EXPENSE"
      }
    },
    groupedResult: {
      INCOME: {
        total: string,
        name: string
      }[],
      EXPENSE: {
        total: string,
        name: string
      }[],
    }
  }>
  pending: boolean,
  refresh: () => void
}

</script>

<template>
  <div>
    <NuxtLayout name="dashboard-layout">
      <div class="p-4 space-y-4 select-none">
        <h1 class="flex items-center gap-2">
          <span class="text-3xl font-bold">Reports</span>
          <button @click="refresh" class="hover:text-primary transition-all"
                  :disabled="pending">
            <UIcon name="lucide:refresh-cw" class="h-5 w-5"
                   :class="[pending ? 'animate-spin':'']"/>
          </button>
        </h1>
        <div class="md:pr-6">
          <WalletDateNav v-model="date" :disabled="pending"/>
        </div>
        <div class="md:pr-6">
          <div class="p-4 space-y-1 border-2 border-black rounded-xl">
            <h1 class="text-xl font-bold">Cashflow</h1>
            <div class="grid md:grid-cols-2 gap-2">
              <div class="">
                <UIcon name="lucide:arrow-up" class="h-5 w-5 text-green-500"/>
                Income: <span class="text-green-500"> {{ authStore.user?.currency }} <span class="font-bold">{{
                  formatNumber(report?.groupedCashflow?.INCOME?.total || '0')
                }}</span> </span></div>
              <div>
                <UIcon name="lucide:arrow-down" class="h-5 w-5 text-red-600"/>
                Expense: <span class="text-red-600">{{ authStore.user?.currency }} <span class="font-bold">{{
                  formatNumber(report?.groupedCashflow?.EXPENSE?.total || '0')
                }}</span></span></div>
            </div>
          </div>
        </div>
        <div>
          <div v-if="pending" class="grid md:grid-cols-2 gap-6 md:pr-6">
            <div v-for="i in 2" class="h-96 bg-gray-100 animate-pulse rounded-xl">

            </div>
          </div>
          <div v-else class="grid md:grid-cols-2 gap-6 md:pr-6">
            <ReportExpense :data="report?.groupedResult?.INCOME"/>
            <ReportIncome :data="report?.groupedResult?.EXPENSE"/>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>

</style>