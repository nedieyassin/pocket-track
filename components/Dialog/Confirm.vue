<script lang="ts" setup>
import {closeDialog} from 'vue3-promise-dialog'

defineProps({
  title: {
    type: String,
    default: 'Confirm',
  },
  message: {
    type: String,
    default: 'Confirm',
  }
});
</script>

<template>
  <div class="flex fixed justify-center top-0 items-center w-screen h-screen">
    <div @click="closeDialog(false)"
         class="fixed backdrop-blur top-0 left-0 h-screen w-screen  z-50">
    </div>
    <div
        class="mb-96 w-full border dark:border-gray-700 border-gray-100 bg-white dark:bg-gray-800 md:w-3/5 lg:w-2/5 xl:w-1/3 max-w-screen-md relative mx-3 md:mx-0 z-50 rounded-2xl shadow-xl p-4">
      <div class="flex justify-between items-center pl-2">
        <div>
          <h1 class="font-bold text-xl text-gray-900 md:text-2xl dark:text-white">{{ title }}</h1>
        </div>
        <button @click="closeDialog(false)">
          <UIcon name="lucide:x" class="h-6 w-6 hover:text-red-600 transition-all"/>
        </button>
      </div>
      <div class="flex flex-col gap-3 py-6">
        <p class="px-3 text-gray-500 dark:text-gray-400 mb-5">
          {{ message }}
        </p>
      </div>
      <div class="flex gap-3 justify-end">
        <UButton @click="closeDialog(false)"
                 variant="soft">
          Cancel
        </UButton>
        <UButton @click="closeDialog(true)"
        >
          Confirm
        </UButton>
      </div>
    </div>
  </div>
</template>
