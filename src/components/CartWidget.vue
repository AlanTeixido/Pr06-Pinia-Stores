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
            :product="{ name: name, price: items[0].price }"
            :count="items.length"
            @updateCount=""
            @clear=""
          />
        </ul>
        <div class="flex justify-end text-2xl mb-5">
          Total: <strong>${{ cartStore.items.reduce((sum, item) => sum + item.price, 0) }}</strong>
        </div>
        <div class="flex justify-end">
          <AppButton class="secondary mr-2" @click="cartStore.items = []">Clear Cart</AppButton>
          <AppButton class="primary">Checkout</AppButton>
        </div>
      </div>

      <!-- Mostrar mensaje cuando el carrito está vacío -->
      <div v-else><em>Cart is Empty</em></div>
    </AppModalOverlay>
  </div>
</template>
