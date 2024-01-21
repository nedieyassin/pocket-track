<script setup lang="ts">

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {type: Number, default: null},
})

const inputNumber = ref<number | undefined>(0);
const formattedInput = ref('0');

watch(() => props.modelValue, (value) => {
  inputNumber.value = parseFloat(value.toString().replaceAll('-', '') || '0');
  formattedInput.value = formatNumber(inputNumber.value.toString().replaceAll('-', ''));
})

const updateNumber = (event: Partial<InputEvent>) => {
  // Remove non-numeric characters and update the formattedInput
  formattedInput.value = (event.target as HTMLInputElement).value.replace(/[^\d.]/g, "");
  // You can apply custom formatting logic here based on your requirements
  // For example, adding commas for thousands separator
  formattedInput.value = formatNumber(formattedInput.value);
  // Update the underlying numeric value
  inputNumber.value = parseFloat(formattedInput.value.replaceAll(',', ''));
  emit('update:modelValue', inputNumber.value);
}
const formatNumber = (value: string) => {
  return Number(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
</script>
<template>
  <UInput :value="formattedInput" @input="updateNumber"/>
</template>

<style scoped>

</style>