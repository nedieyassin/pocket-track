<script setup lang="ts">
import {useWalletDialog} from "~/composables/useDialogs";
import type {IWallet} from "~/types";

definePageMeta({
  middleware: ['auths', 'auth-logged-in'],
})


const {data: wallets, pending} = useFetch<IWallet[]>('/api/wallets')


const handleWallet = () => {
  useWalletDialog().then((res) => {

  })
}


</script>

<template>
  <div>
    <NuxtLayout name="dashboard-layout">
      <div class="p-4 space-y-4 select-none">
        <h1 class="flex items-center gap-2">
          <span class="text-3xl font-bold">Wallets</span>
          <UIcon v-if="pending" name="lucide:loader" class="animate-spin h-6 w-6"/>
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <template v-if="pending">
            <WalletSkeleton v-for="i in 3" :key="i"/>
          </template>
          <template v-else>
            <WalletCard v-for="wallet in wallets as IWallet[]" :key="wallet.id" :wallet="wallet"/>
          </template>
          <button
              @click="handleWallet"
              class="flex justify-center items-center flex-col border-black border-dashed  border-2 p-4 rounded-xl bg-white hover:bg-gray-100 cursor-pointer">
            <span>
              <UIcon name="ri:add-fill" class="text-4xl"/>
            </span>
            <span role="heading" class="text-xl">Add Wallet</span>
          </button>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>