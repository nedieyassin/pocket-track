<script setup lang="ts">
import type {ITransactionCategory} from "~/types";

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {type: String, default: null},
  type: {type: String, default: null},
})

const {data, pending} = useFetch<ITransactionCategory[]>('/api/categories');
const selectedCategory = ref<string | null>(null)

const categories = computed(() => {
  return ((data.value || []) as ITransactionCategory[]).filter(c => c.type === props.type)
})

watchEffect(() => {
  if (props.modelValue) {
    selectedCategory.value = props.modelValue
  }
})

watch(() => selectedCategory.value, (value) => {
  emit('update:modelValue', value)
})
</script>

<template>
  <div>
    <USelectMenu v-model="selectedCategory"
                 :options="categories"
                 value-attribute="id"
                 option-attribute="name"
                 loading-icon="lucide:loader"
                 :loading="pending"
    >
      <template #label>
        <span>{{ categories.find(c => c.id === selectedCategory)?.name || '...' }}</span>
      </template>
    </USelectMenu>
  </div>
</template>

<style scoped>

</style>