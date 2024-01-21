<script setup lang="ts">
const auth = useAuth();
const authStore = useAuthStore();
const drawerOpen = ref(false);


if (authStore.user === undefined || auth.user?.id !== authStore.user?.id) {
  authStore.getCurrency();
}


const menuItems = [
  {
    icon: 'lucide:wallet',
    title: 'Wallets',
    url: `/dashboard/wallets`,
  },
  {
    icon: 'lucide:pie-chart',
    title: 'Reports',
    url: `/dashboard/reports`,
  },
  {
    icon: 'lucide:settings', //Image,
    title: 'Settings',
    url: `/dashboard/settings`,
  },
]
</script>

<template>
  <div>
    <div class="fixed flex items-center justify-between left-0 top-0 w-full bg-white h-16 px-3 md:px-6 z-50">
      <div class="flex gap-3 md:gap-4 items-center">
        <button @click="drawerOpen = !drawerOpen">
          <UIcon name="lucide:menu" class="text-3xl"/>
        </button>
        <UIcon name="lucide:wallet-2" class="text-3xl"/>
        <div class="font-bold text-xl">Pocket Track</div>
      </div>
      <div>
        <NuxtLink to="/dashboard/settings" class="flex gap-4 items-center cursor-pointer">
          <div class="hidden md:block text-lg font-semibold">
            {{ auth?.user?.given_name }} {{ auth?.user?.family_name }}
          </div>
          <div>
            <img v-if=" auth?.user?.picture" :src=" auth?.user?.picture" alt=""
                 class="h-8 border-black border rounded-full">
            <UIcon v-else name="lucide:user-2" class="text-3xl"/>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="pt-16">
      <div
          :class="[drawerOpen ? 'left-0 lg:-left-48' : '-left-48 lg:left-0']"
          class="fixed transition-all top-0 w-48 h-screen bg-white  pt-16 z-40">
        <div class="py-1 space-y-1">
          <template v-for="menuItem in menuItems" :key="menuItem.title">
            <NuxtLink
                :to="menuItem.url"
                class="block"
            >
              <div
                  :class="[ $route.path.includes(menuItem.url) ? 'text-primary-600 font-bold' : 'hover:text-primary-600']"
                  class="flex items-center gap-3 px-3 md:px-6 py-3 border-transparent cursor-pointer rounded- transition-all">
                <UIcon :name="menuItem.icon" class="h-6 w-6"/>
                <span>{{ menuItem.title }}</span>
              </div>
            </NuxtLink>
          </template>
        </div>
      </div>
      <div :class="[drawerOpen ? 'pl-0' : 'pl-0 lg:pl-48']" class="relative w-full transition-all">
        <div class="">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>