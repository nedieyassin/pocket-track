<script setup lang="ts">
import {DialogWrapper} from "vue3-promise-dialog"
</script>
<template>
  <div class="relative bg-white dark:bg-gray-900">
    <NuxtLoadingIndicator/>
    <div>
      <NuxtPage/>
    </div>
    <UNotifications/>
    <DialogWrapper class="z-50"/>
  </div>
</template>