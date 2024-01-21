<script setup lang="ts">
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {type: String, default: null},
})

const colors = [
  '#fca5a5',
  '#fdba74',
  '#fcd34d',
  '#fde047',
  '#bef264',
  '#86efac',
  '#6ee7b7',
  '#5eead4',
  '#67e8f9',
  '#7dd3fc',
  '#93c5fd',
  '#a5b4fc',
  '#c4b5fd',
  '#d8b4fe',
  '#f0abfc',
  '#fbcfe8',
  '#fecdd3',
]
const selectedColor = ref<string | null>(null)
watch(() => props.modelValue, (value) => {
  selectedColor.value = value
})
watch(() => selectedColor.value, (value) => {
  emit('update:modelValue', value)
})
</script>

<template>
  <div class="space-y-1">
    <label class="font-semibold">Background</label>
    <div class="flex flex-wrap gap-2">
      <div role="button" v-for="color in colors" :key="color"
           :style="{backgroundColor:color}"
           @click="selectedColor = color"
           class="h-8 w-8 rounded flex items-center justify-center cursor-pointer"
      >
        <UIcon name="lucide:check" v-if="color === selectedColor"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>