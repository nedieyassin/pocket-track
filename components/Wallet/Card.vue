<script setup lang="ts">
import type {PropType} from "vue";
import type {IWallet} from "~/types";

defineProps({
  wallet: {
    type: Object as PropType<IWallet>,
    required: true,
  }
})

const authStore = useAuthStore();

</script>
<template>
  <NuxtLink :to="`/dashboard/wallets/${wallet.id}`"
            :style="{backgroundColor: wallet.color}"
            class="flex flex-col border-black  border-2 p-4 px-5 rounded-xl cursor-pointer">
    <div>
      <UIcon :name="wallet.icon" class="text-2xl"/>
    </div>
    <h1 class="font-bold text-xl flex-1">{{ wallet.name }}</h1>
    <h2 class="text-right"><span>{{ authStore.user?.currency }} </span><span class="text-xl font-bold">{{
        formatNumber(wallet.balance || 0)
      }}</span></h2>
  </NuxtLink>
</template>