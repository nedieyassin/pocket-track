<script setup lang="ts">

</script>

<template>
  <NuxtLayout>
    <div class="w-full">
      <div class="container mx-auto py-36 px-4 min-h-full">
        <div class="grid md:grid-cols-2">
          <div class="space-y-4">
            <div>
              <UIcon name="lucide:wallet-2" class="text-8xl"/>
            </div>
            <h1 class="text-4xl md:text-8xl font-bold">Pocket Track</h1>
            <h2 class="text-lg">Unlock financial freedom with Pocket Track – Your Personal Expense Wizard! Effortlessly
              track,
              manage, and conquer your expenses on the go. Take charge of your budget, one transaction at a time. Start
              your
              journey to financial empowerment today!</h2>
            <div class="flex flex-col md:flex-row gap-4">
              <UButton to="api/login" size="lg" class="justify-center" external>Continue to Dashboard</UButton>
              <UButton to="api/register" size="lg" variant="outline" class="justify-center" external>Sign Up</UButton>
            </div>
          </div>
          <div>
             
          </div>
        </div>
      </div>
      <div class="pb-28">
        <div class="container mx-auto px-4">
        <span class="text-gray-500">Developed by <a href="" class="text-primary underline">yassinnedie9121@gmail.com</a> as a submission for <a
            href="https://crackeddevs.devpost.com/" target="_blank"
            class="text-primary underline">CrackedDevs Hackathon</a></span>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>