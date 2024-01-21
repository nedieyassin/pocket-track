<script setup lang="ts">
import {formatNumber} from "~/utils";
import type {Ref} from "vue";
import type {ITransaction, IWallet} from "~/types";

const props = defineProps({
  wallet: {
    type: [Object as PropType<IWallet>, null],
    required: true,
  },
});

const emit = defineEmits(['fetchWallet']);


const dayjs = useDayjs();
const toast = useToast();
const date = ref(undefined);
const isLoading = ref(false);

const authStore = useAuthStore();

const query = computed(() => ({
  date_start: dayjs(date.value).startOf('month').format('YYYY-MM-DD'),
  date_end: dayjs(date.value).endOf('month').format('YYYY-MM-DD'),
}))


const {
  data: transactions,
  pending: transactionsPending,
  refresh: transactionsRefresh
} = useFetch(`/api/transactions/wallet/${useRoute().params.wallet_id}`, {
  query
}) as any as {
  data: Ref<ITransaction[] | undefined>
  pending: boolean,
  refresh: () => void
}


const groupedTransactions = computed(() => {
  if (transactions.value) {
    return transactions.value?.map((t) => ({
      ...t,
      monthDate: dayjs(t.date).format('ddd, DD MMM YYYY')
    })).reduce((acc, transaction) => {
      if (acc[transaction.monthDate]) {
        acc[transaction.monthDate].push(transaction);
      } else {
        acc[transaction.monthDate] = [transaction];
      }
      return acc;
    }, {} as Record<string, ITransaction[]>)
  } else {
    return {} as Record<string, ITransaction[]>
  }
})

const handleTransaction = (transaction: ITransaction | undefined = undefined) => {
  if (props.wallet) {
    useTransactionDialog(props.wallet, transaction).then((res) => {
      if (res) {
        emit('fetchWallet', props.wallet.id);
        transactions.value?.unshift(res);
        transactionsRefresh();
      }
    })
  }
}

const handleDeleteTransaction = (transaction: ITransaction) => {
  useAsyncConfirmDialog({
    title: 'Delete Transaction',
    message: 'Are you sure you want to delete this transaction?',
  }).then((r) => {
    if (r) {
      transactions.value = transactions.value?.filter((t) => t.id !== transaction.id);
      isLoading.value = true;
      $fetch(`/api/transactions/${transaction.id}`, {
        method: 'DELETE',
      }).then(() => {
        isLoading.value = false;
        toast.add({
          title: 'Success',
          description: 'Transaction created successfully',
          color: 'green',
        })
        transactionsRefresh();
        emit('fetchWallet', props.wallet.id);
      }).catch(() => {
        isLoading.value = false;
        toast.add({
          title: 'Error',
          description: 'Something went wrong',
          color: 'red',
        })
      })
    }
  })

}
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <h1 class="text-xl font-bold">Transactions</h1>
      <button @click="transactionsRefresh" class="hover:text-primary transition-all"
              :disabled="transactionsPending || isLoading">
        <UIcon name="lucide:refresh-cw" class="h-5 w-5"
               :class="[transactionsPending || isLoading ? 'animate-spin':'']"/>
      </button>
    </div>
    <button v-if="wallet" @click="handleTransaction()"
            class="bg-primary hover:bg-primary-600 transition-all text-white  h-10 w-10 rounded-full">
      <UIcon name="lucide:plus" class="h-6 w-6"/>
    </button>
  </div>
  <!--        -->
  <WalletDateNav v-model="date" :disabled="transactionsPending"/>

  <!--        -->
  <div v-if="transactionsPending">
    <TransactionSkeleton/>
  </div>
  <div v-else class="flex flex-col gap-6">
    <!--         -->
    <div v-for="(transactions, date) in groupedTransactions" class="flex flex-col gap-2">
      <div class="px-1 text-sm">{{ date }}</div>
      <div v-for="transaction in transactions"
           :key="transaction.id"
           @click="handleTransaction(transaction)" role="button"
           class="flex justify-between px-4 py-3 cursor-pointer hover:bg-gray-100 transition-all border rounded-xl">
        <div>
          <h1 class="font-semibold">{{ transaction.name }}</h1>
          <h2 class="pb-1">{{ transaction.transactionCategory.name }} </h2>
        </div>
        <div class="flex justify-between flex-col items-end">
          <div :class="[transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-400']">
            {{ authStore.user?.currency }}<span class="font-semibold">{{
              formatNumber(transaction.amount || 0)
            }}</span>
          </div>
          <button
              @click.stop="handleDeleteTransaction(transaction)"
              class="p-2 hover:bg-red-100 hover:text-red-600 h-8 w-8 rounded-full flex items-center justify-center transition-all">
            <UIcon name="lucide:trash-2" class="h-5 w-5  transition-all"/>
          </button>
        </div>
      </div>
    </div>
    <!--          -->
    <div v-if="!transactions?.length">
      <div class="md:text-3xl text-gray-300 py-20 text-center space-y-4">
        <div>No transactions found in this wallet for this month</div>
        <UButton @click="handleTransaction()">Add Transaction</UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>