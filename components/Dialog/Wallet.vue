<script lang="ts" setup>
import {closeDialog} from 'vue3-promise-dialog'
import {walletSchema} from "~/validations/wallet";
import type {PropType} from "vue";
import type {IWallet} from "~/types";

const {value} = defineProps({
  value: {
    type: Object as PropType<IWallet>,
  },
});

const isLoading = ref(false);
const toast = useToast();

onMounted(() => {
  if (value) {
    Object.assign(_form, value)
  }
})

const _form = reactive<Partial<IWallet>>({
  icon: undefined,
  color: undefined,
  name: undefined,
})


const handleSubmit = () => {
  isLoading.value = true;
  if (value && value.id) {
    $fetch(`/api/wallets/${value.id}`, {
      method: 'PUT' as any,
      body: _form
    }).then(() => {
      toast.add({
        title: 'Success',
        description: 'Wallet updated successfully',
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
    $fetch('/api/wallets', {
      method: 'POST',
      body: _form
    }).then(() => {
      toast.add({
        title: 'Success',
        description: 'Wallet created successfully',
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
  }
}

</script>

<template>
  <div class="flex fixed justify-center top-0 items-end md:items-start w-screen h-screen">
    <div
        class="fixed backdrop-blur top-0 left-0 h-screen w-screen  z-50">
    </div>
    <div
        class="md:mt-10  w-full border border-gray-100 bg-white md:w-3/5 lg:w-2/5 xl:w-1/3 max-w-screen-md relative md:mx-0 z-50 md:rounded-2xl shadow-xl p-4">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="font-bold text-xl text-gray-900 md:text-2xl dark:text-white">{{ value ? 'Update' : 'Add' }}
            Wallet</h1>
        </div>
        <button @click="closeDialog(false)">
          <UIcon name="lucide:x" class="h-6 w-6 hover:text-red-600 transition-all"/>
        </button>
      </div>
      <div class="flex flex-col gap-3 pt-6">
        <UForm @submit="handleSubmit" :state="_form" :schema="walletSchema" class="space-y-3">

          <UFormGroup label="Name" name="name">
            <UInput v-model="_form.name"/>
          </UFormGroup>
          <UFormGroup name="color">
            <FormColorPicker v-model="_form.color"/>
          </UFormGroup>
          <UFormGroup name="icon">
            <FormWalletIconPicker v-model="_form.icon"/>
          </UFormGroup>
          <div class="pt-6">
            <UButton type="submit" :loading="isLoading" block> Save Wallet</UButton>
          </div>
        </UForm>
      </div>
    </div>
  </div>
</template>
