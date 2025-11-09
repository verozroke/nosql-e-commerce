<template>
  <div class="flex flex-wrap gap-4">
    <ProductItem
      v-for="product in products"
      :key="product._id"
      :product="product"
      class="w-1/4"
    />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/core/types/product';

defineProps<{
  products: Product[]
}>()

</script>

<style scoped></style>