<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "./stores/ProductStore";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/CartStore";
const cartStore = useCartStore();
const productStore = useProductStore();
const { products } = storeToRefs(productStore);

productStore.fill();
</script>
<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
      v-for="product in productStore.products"
      :key="product.name"
      :product="product"
      @addToCart="(count, product) => cartStore.addToCart(count, product)"
      />         
    </ul>
  </div>
</template>

