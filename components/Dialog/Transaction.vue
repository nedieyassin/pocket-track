<script lang="ts" setup>
import {closeDialog} from 'vue3-promise-dialog'
import {transactionSchema} from "~/validations/wallet";
import type {PropType} from "vue";
import type {ITransaction, IWallet} from "~/types";

const {wallet, value} = defineProps({
  wallet: {
    type: Object as PropType<IWallet>,
    required: true,
  },
  value: {
    type: Object as PropType<ITransaction>,
  },
});

const isLoading = ref(false);
const toast = useToast();
const dayjs = useDayjs();

const authStore = useAuthStore();


onMounted(() => {
  if (value) {
    Object.assign(_form, {
      ...value,
      date: dayjs(value.date).format('YYYY-MM-DDTHH:mm'),
      amount: parseFloat(value.amount as unknown as string || '0'),
      type: value.type === 'INCOME' ? 0 : 1
    })
  }
})

const transactionTypes = [
  {
    label: 'Income',
    slot: 'income',
  },
  {
    label: 'Expense',
    slot: 'expense',
  }
]

const _form = reactive<Partial<ITransaction>>({
  walletId: wallet.id,
  name: undefined,
  date: undefined,
  type: 0,
  amount: 0,
  transactionCategoryId: undefined,
  notes: undefined,
})


const handleSubmit = () => {
  isLoading.value = true;
  if (value && value.id) {
    $fetch(`/api/transactions/${value.id}`, {
      method: 'PUT' as any,
      body: {
        type: _form.type === 0 ? 'INCOME' : 'EXPENSE',
        name: _form.name,
        amount: _form.type === 0 ? _form.amount : -(_form.amount || 0),
        date: _form.date,
        notes: _form.notes,
        transactionCategoryId: _form.transactionCategoryId,
      }
    }).then(() => {
      toast.add({
        title: 'Success',
        description: 'Transaction updated successfully',
        color: 'green',
      })
      isLoading.value = false;
      closeDialog(true);
    }).catch(() => {
      toast.add({
        title: 'Error',
        description: 'Something went wrong',
        color: 'red',
      })
      isLoading.value = false;
    })
  } else {
    $fetch('/api/transactions', {
      method: 'POST' as any,
      body: {
        ..._form,
        type: _form.type === 0 ? 'INCOME' : 'EXPENSE',
        amount: _form.type === 0 ? _form.amount : -(_form.amount || 0),
      }
    }).then((res) => {
      toast.add({
        title: 'Success',
        description: 'Transaction created successfully',
        color: 'green',
      })
      isLoading.value = false;
      closeDialog(res);
    }).catch(() => {
      toast.add({
        title: 'Error',
        description: 'Something went wrong',
        color: 'red',
      })
      isLoading.value = false;
    })
  }
}

</script>

<template>
  <div class="flex fixed justify-center top-0 items-end md:items-start  w-screen h-screen">
    <div
        class="fixed backdrop-blur top-0 left-0 h-screen w-screen  z-50">
    </div>
    <div
        class="max-h-screen md:max-h-[90vh] overflow-y-auto md:mt-10 w-full border border-gray-100 bg-white md:w-3/5 lg:w-2/5 xl:w-1/3 max-w-screen-md relative md:mx-0 z-50 md:rounded-2xl shadow-xl p-4">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="font-bold text-xl text-gray-900 md:text-2xl dark:text-white">{{ value ? 'Update' : 'Add' }}
            Transaction</h1>
        </div>
        <button @click="closeDialog(false)">
          <UIcon name="lucide:x" class="h-6 w-6 hover:text-red-600 transition-all"/>
        </button>
      </div>
      <div class="flex flex-col gap-3 pt-6">
        <UForm @submit="handleSubmit" :state="_form" :schema="transactionSchema" v-slot="{ errors }" class="space-y-3">
          <UFormGroup label="Type" name="type">
            <UTabs :items="transactionTypes" v-model="_form.type"/>
          </UFormGroup>
          <UFormGroup label="Category" name="transactionCategoryId">
            <div>
              <FormTransactionCategories
                  :type="_form.type ? 'EXPENSE' : 'INCOME'"
                  v-model="_form.transactionCategoryId"
              />
            </div>
          </UFormGroup>
          <UFormGroup label="Name" name="name">
            <UInput v-model="_form.name"/>
          </UFormGroup>
          <UFormGroup label="Date" name="date">
            <UInput v-model="_form.date" type="datetime-local"/>
          </UFormGroup>
          <UFormGroup :label="`Amount (${authStore.user?.currency})`" name="amount">
            <FormFormattedInput v-model="_form.amount"/>
          </UFormGroup>
          <UFormGroup label="Notes" name="notes">
            <UTextarea v-model="_form.notes"/>
          </UFormGroup>
          <div class="pt-6">
            <UButton type="submit" :loading="isLoading" block> Save Transaction</UButton>
          </div>
        </UForm>
      </div>
    </div>
  </div>
</template>
