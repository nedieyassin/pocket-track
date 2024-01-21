<script setup lang="ts">

const props = defineProps({
  modelValue: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue']);

const months = ref<{ label: string; value: string; index: number, year: number }[]>([]);
const month = ref<any>(undefined);

const currentMonth = computed(() => months.value.find(m => m.value === month.value));

const handlePrev = () => {
  if (currentMonth.value) {
    month.value = months.value[currentMonth.value.index - 1]?.value
  }
}

const handleNext = () => {
  if (currentMonth.value) {
    month.value = months.value[currentMonth.value.index + 1]?.value
  }
}

const handleSetYear = (year: number | undefined = undefined) => {
  months.value = getYearMonths(year || new Date().getFullYear());
  month.value = year ? months.value[0].value : months.value[new Date().getMonth()].value
}
onMounted(() => {
  handleSetYear();
})

watchDebounced(
    () => month.value,
    () => {
      emit('update:modelValue', month.value)
    },
    {debounce: 500, maxWait: 1000},
)

</script>

<template>
  <div class="flex items-center gap-3">
    <button
        v-if="currentMonth"
        @click="handleSetYear(currentMonth?.year - 1)"
        :disabled="disabled"
        :class="[disabled ? 'text-gray-300' : 'hover:bg-gray-200']"
        class="text-sm bg-gray-100 px-4 py-1 rounded-full  transition-all">
      {{ currentMonth?.year - 1 }}
    </button>
    <button @click="handlePrev"
            :disabled="!months[(currentMonth?.index||0) - 1] || disabled"
            :class="[!months[(currentMonth?.index || 0) - 1] || disabled  ? 'text-gray-300' : 'hover:bg-gray-200']"
            class="text-sm bg-gray-100 px-1 py-1 rounded-full transition-all">
      <UIcon name="lucide:chevron-left" class="h-5 w-5"/>
    </button>
    <button @click="handleSetYear()"
            :disabled="disabled"
            :class="[disabled ? 'text-gray-300' : 'hover:bg-gray-200']"
            class="text-sm bg-gray-100 px-4 py-1 rounded-full  transition-all">
      {{ currentMonth?.label }}
    </button>
    <button @click="handleNext"
            :disabled="!months[(currentMonth?.index || 0) + 1] || disabled"
            :class="[!months[(currentMonth?.index || 0) + 1] || disabled ? 'text-gray-300' : 'hover:bg-gray-200']"
            class="text-sm bg-gray-100 px-1 py-1 rounded-full  transition-all">
      <UIcon name="lucide:chevron-right" class="h-5 w-5"/>
    </button>
    <button @click="handleSetYear(currentMonth?.year +1)"
            v-if="currentMonth"
            :disabled="disabled"
            :class="[disabled ? 'text-gray-300' : 'hover:bg-gray-200']"
            class="text-sm bg-gray-100 px-4 py-1 rounded-full transition-all">
      {{ currentMonth?.year + 1 }}
    </button>
  </div>
</template>

<style scoped>

</style>