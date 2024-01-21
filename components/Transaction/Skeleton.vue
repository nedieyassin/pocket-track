<script setup lang="ts">

</script>

<template>
  <div v-for="i in 3" class="space-y-3 py-4">
    <div>
      <div class="w-20 h-4 bg-gray-300 rounded-xl">
      </div>
    </div>
    <div class="bg-gray-100 animate-pulse   p-4 rounded-xl space-y-2">
      <div>
        <div class="w-32 h-5 bg-gray-300">
        </div>
      </div>
      <h1 class="w-48 h-4 bg-gray-200"></h1>
    </div>
    <div class="bg-gray-100 animate-pulse   p-4 rounded-xl space-y-2">
      <div>
        <div class="w-32 h-5 bg-gray-300">
        </div>
      </div>
      <h1 class="w-20 h-4 bg-gray-200"></h1>
    </div>
  </div>
</template>

<style scoped>

</style>