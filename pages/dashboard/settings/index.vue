<script setup lang="ts">


definePageMeta({
  middleware: ['auths', 'auth-logged-in'],
})

const auth = useAuth();
const authStore = useAuthStore();


const currency = ref(authStore.user?.currency);
const isLoading = ref(false);

watchDebounced(() => currency.value, () => {
  isLoading.value = true
  authStore.updateCurrency(currency.value).then(() => {
    isLoading.value = false
  })
}, {debounce: 500, maxWait: 1000},)
</script>

<template>
  <div>
    <NuxtLayout name="dashboard-layout">
      <div class="p-4 space-y-4 select-none">
        <h1 class="flex items-center gap-2">
          <span class="text-3xl font-bold">Settings</span>
          <UIcon v-if="false" name="lucide:loader" class="animate-spin h-6 w-6"/>
        </h1>
        <div class="space-y-6">
          <!--          -->
          <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-6  md:grid-cols-3 ">
            <div><h2 class="text-base font-semibold leading-7">Personal Information</h2>
              <p class="mt-1 text-sm leading-6 text-accent-800 dark:text-accent-100">
                Your account information is used to manage your account.
              </p></div>
            <form class="md:col-span-2">
              <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div class="col-span-full flex items-center gap-x-8">
                  <img alt="" loading="lazy" width="512" height="512"
                       decoding="async" data-nimg="1"
                       class="h-24 w-24 flex-none object-cover rounded-full"
                       style="color:transparent"
                       :src="auth?.user?.picture">
                  <div>
                    <h1 class="font-bold text-3xl">{{ auth?.user?.given_name }} {{ auth?.user?.family_name }}</h1>
                    <h2 class="">{{ auth?.user?.email }}</h2>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <!--          -->
          <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-6  md:grid-cols-3 ">
            <div><h2 class="text-base font-semibold leading-7">Currency</h2>
              <p class="mt-1 text-sm leading-6 text-accent-800 dark:text-accent-100">
                Select your preferred currency for transactions and reports.
              </p>
            </div>
            <form class="md:col-span-2">
              <div class="md:w-64">
                <UFormGroup label="Currency">
                  <USelect :loading="isLoading" :options="currencyOptions" v-model="currency" option-attribute="name"
                           value-attribute="value"/>
                </UFormGroup>
              </div>
            </form>
          </div>
          <!--          -->
          <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-6 ">
            <div><h2 class="text-base font-semibold leading-7">Account Management</h2>
              <p class="mt-1 text-sm leading-6 text-accent-800 dark:text-accent-100">
                Sign out of pocket track.
              </p>
            </div>
            <form class="">
              <div class="md:w-64">
                <UButton color="red" to="/api/logout" external block>Sign Out</UButton>
              </div>
            </form>
          </div>
          <!--          -->
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>

</style>