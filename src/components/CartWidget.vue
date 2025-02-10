<script setup>
import { ref } from "vue";
import CartItem from "./CartItem.vue";
import { useCartStore } from "@/stores/CartStore";

const active = ref(false);
const cartStore = useCartStore();
</script>

<template>
  <div class="relative">
    <!-- Icon that always shows -->
    <span class="cursor-pointer" @click="active = true">
      <fa icon="shopping-cart" size="lg" class="text-gray-700" />
      <div class="cart-count absolute">{{ cartStore.count }}</div>
    </span>

    <!-- Modal Overlay only shows when cart is clicked on -->
    <AppModalOverlay :active="active" @close="active = false">
      <div v-if="!cartStore.isEmpty">
        <ul class="items-in-cart">
          <CartItem
          v-for="(items, name) in cartStore.grouped"
          :key="name"
          :product="{ name: name, price: items[0]?.price || 0 }"
          :count="cartStore.groupCount(name)"
          @updateCount="cartStore.setItemCount(items[0], $event)"
          @clear="cartStore.clearItem(name)"
        />
        
        </ul>
        <div class="flex justify-end text-2xl mb-5">
          Total: <strong>${{ cartStore.total.toFixed(2) }}</strong>
        </div>
        
        <div class="flex justify-end">
          <AppButton class="secondary mr-2" @click="cartStore.$reset()">Clear Cart</AppButton>
          <AppButton class="primary">Checkout</AppButton>
        </div>
      </div>

      <!-- Mostrar mensaje cuando el carrito está vacío -->
      <div v-else><em>Cart is Empty</em></div>
    </AppModalOverlay>
  </div>
</template>
