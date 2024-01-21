<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {type: String, default: null},
})

const icons = [
  'ri:cash-fill',
  'ri:wallet-3-fill',
  'ri:bank-card-fill',
  'ri:visa-line',
  'ri:safe-fill',
  'ri:bank-fill',
  'ri:paypal-fill',
  'ri:lightbulb-flash-fill',
  'ri:home-4-fill',
  'ri:car-fill',
  'ri:money-dollar-circle-fill',
  'ri:water-flash-fill',
  'ri:graduation-cap-fill',
  'ri:btc-fill',
  'ri:coins-line',
]
const selectedIcon = ref<string | null>(null)

watch(() => props.modelValue, (value) => {
  selectedIcon.value = value
})
watch(() => selectedIcon.value, (value) => {
  emit('update:modelValue', value)
})

</script>

<template>
  <div class="space-y-1">
    <label class="font-semibold">Icon</label>
    <div class="flex flex-wrap gap-2">
      <div role="button" v-for="icon in icons" :key="icon"
           @click="selectedIcon = icon"
           :class="[icon === selectedIcon ? 'bg-primary text-white' : 'bg-gray-100']"
           class="h-10 w-10 rounded flex items-center justify-center cursor-pointer"
      >
        <UIcon :name="icon" class="text-xl"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>