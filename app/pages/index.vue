<template>
  <div class="bg-slate-100 w-screen min-h-screen overflow-x-hidden flex flex-col px-20 py-10">
    <n-h1>
      Recommendations
    </n-h1>
    <n-p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, totam! Eos, dolorem quis. Alias, officia!
    </n-p>

    <ProductList :products="products" />
  </div>
</template>

<script setup lang="ts">
import { useMessage, NH1, NP } from 'naive-ui';


import { authService } from '~/core/services/auth.service';
import { productService } from '~/core/services/product.service';
import type { Product } from '~/core/types/product';
const router = useRouter()
const message = useMessage()
const products = ref<Product[]>([])


async function getRecommendations() {
  try {
    const user = await authService.me()
    const recommendations = await productService.recommendations(user._id)
    products.value = recommendations
  } catch (error) {
    console.error(error)
    message.error('Could not get recommendations')
  }
}


onMounted(async () => {
  if (!localStorage.getItem('token')) {
    router.push('/sign-in')
    return
  }

  await getRecommendations()

})
</script>

<style scoped></style>