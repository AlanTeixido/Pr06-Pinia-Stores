<script setup>
// imports
import { ref } from "vue";
import AppCountInput from "./AppCountInput.vue";

// props
const props = defineProps({
  product: Object,
});

// emits
defineEmits(["addToCart"])

// data
const count = ref(0);
</script>
<template>
  <li class="card">
    <img :src="`/images/${product.image}`" class="mb-3" width="300" />
    <div>
      {{ product.name }} - <span class="text-green-500">${{product.price}}</span>
      <div class="text-center m-4">
        <AppCountInput v-model="count" />
      </div>
      <AppButton
      class="primary"
      @click="() => { 
          if (count > 0) {
              console.log('Emit event:', count, product);
              $emit('addToCart', count, product);
              count = 1;
          }
      }"
    >
      Add to Cart
    </AppButton>
    
    </div>
  </li>
</template>
