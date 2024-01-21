<script setup lang="ts">
import type {PropType} from "vue";
import type {IWallet} from "~/types";

defineProps({
  wallet: {
    type: Object as PropType<IWallet>,
    required: true,
  }
})

const emit = defineEmits(['onDelete']);
const authStore = useAuthStore();
const router = useRouter();


</script>
<template>
  <div @click="router.push(`/dashboard/wallets/${wallet.id}`)"
       :style="{backgroundColor: wallet.color}"
       class="flex flex-col border-black  border-2 p-4 px-5 rounded-xl cursor-pointer">
    <div class="flex w-full items-center justify-between">
      <UIcon :name="wallet.icon" class="text-2xl"/>
      <button
          @click.stop="emit('onDelete', wallet)"
          class="p-2 hover:bg-red-100 hover:text-red-600 h-8 w-8 rounded-full flex items-center justify-center transition-all">
        <UIcon name="lucide:trash-2" class="h-5 w-5  transition-all"/>
      </button>
    </div>
    <h1 class="font-bold text-xl flex-1">{{ wallet.name }}</h1>
    <h2 class="text-right"><span>{{ authStore.user?.currency }} </span><span class="text-xl font-bold">{{
        formatNumber(wallet.balance || 0)
      }}</span></h2>
  </div>
</template>