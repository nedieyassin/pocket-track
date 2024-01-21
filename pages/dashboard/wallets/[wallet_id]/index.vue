<script setup lang="ts">
import {useWalletDialog} from "~/composables/useDialogs";
import type {ITransaction, IWallet} from "~/types";
import type {Ref} from "vue";
import {formatNumber} from "~/utils";


definePageMeta({
  middleware: ['auths', 'auth-logged-in'],
})

const {data: wallet, pending, refresh} = useFetch(`/api/wallets/${useRoute().params.wallet_id}`) as any as {
  data: Ref<IWallet | undefined>
  pending: boolean,
  refresh: () => void
}


const authStore = useAuthStore();


const handleWallet = (data: IWallet | undefined) => {
  useWalletDialog(data).then((res) => {
    if (res) {
      refresh()
    }
  })
}


</script>

<template>
  <div>
    <NuxtLayout name="dashboard-layout">
      <div class="p-4 space-y-4 select-none max-w-screen-lg">
        <div class="flex gap-3 items-center">
          <button @click="$router.back()" class="hover:text-primary">
            <UIcon name="lucide:arrow-left" class="h-6 w-6"/>
          </button>
          <div class="flex gap-1 items-center">
            <NuxtLink to="/dashboard/wallets" class="hover:underline">Wallets</NuxtLink>
            <span class="text-gray-500">/</span>
            <div class="flex gap-3 items-center">
              <div v-if="pending && !wallet" class="h-3 w-10 bg-gray-300 animate-pulse rounded">
              </div>
              <span v-else class="text-primary font-bold">
                  <span class="line-clamp-1">{{ wallet?.name }}</span>
              </span>
              <UIcon v-if="pending" name="lucide:loader" class="animate-spin h-6 w-6 shrink-0"/>

            </div>
          </div>
        </div>
        <div>
          <WalletSkeleton v-if="pending"/>
          <div v-else :style="{backgroundColor: wallet?.color}"
               class="border-black  border-2 p-3 px-4  rounded-xl space-y-3">
            <div class="flex gap-3 items-center justify-between">
              <div class="flex gap-3 items-center">
                <UIcon :name="wallet?.icon" class="text-2xl shrink-0"/>
                <h1 class="font-bold text-xl line-clamp-1">{{ wallet?.name }}</h1>
              </div>
              <div>
                <button @click="handleWallet(wallet)" class="hover:text-primary transition-all">
                  <UIcon name="lucide:edit" class="h-5 w-5"/>
                </button>
              </div>
            </div>
            <h2 class="text-right">Balance: <span>{{ authStore.user?.currency }} </span>
              <span class="text-xl font-bold">
                {{ formatNumber(wallet?.balance || 0) }}
              </span>
            </h2>
          </div>
        </div>
        <TransactionList :wallet="wallet" @fetchWallet="refresh()"/>

      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>

</style>