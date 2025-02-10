<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const updateValue = (newValue) => {
  let parsedValue = parseInt(newValue) || 1;
  if (parsedValue < 1) parsedValue = 1; 
  emit("update:modelValue", parsedValue); 
};
</script>


<template>
  <div class="count-input">
    <button @click="updateValue(modelValue - 1)">-</button>
    <input type="number" :value="modelValue" @input="updateValue($event.target.value)" />
    <button @click="updateValue(modelValue + 1)">+</button>
  </div>
</template>

<style scoped>
input[type="number"] {
  appearance: none;
  -moz-appearance: textfield;
  border: 1px solid gray;
  @apply border-gray-500 w-10 text-center;
}
button {
  border: 1px solid gray;
}
</style>
