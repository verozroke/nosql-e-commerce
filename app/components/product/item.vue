<template>
  <div class="flex flex-col px-6 py-4 rounded-md shadow bg-slate-100">
    <div class="mx-auto w-1/2 relative rounded-md">
      <nuxt-img
        :src="product.image_url"
        class="rounded-md"
      />
      <nuxt-link :href="`/product/${product._id}`">
        <div
          class="bg-slate-900/40 opacity-0 hover:opacity-100 rounded-md transition-all w-full h-full absolute inset-0 flex items-center justify-center text-slate-200 underline font-bold"
        >View</div>
      </nuxt-link>
    </div>
    <n-h4>{{ product.name }}</n-h4>
    <n-tag
      class='w-fit mb-2 capitalize'
      :bordered="false"
      type="success"
    >
      {{ product.category }}
    </n-tag>
    <n-text>{{ product.description }}</n-text>

    <div class="flex pt-8 justify-between w-full">
      <n-h2>{{ product.price }} тенге</n-h2>
      <div class="flex gap-2">
        <n-button
          tertiary
          circle
          type="error"
          @click="like"
        >
          <template #icon>
            <n-icon>
              <HeartBrokenFilled />
            </n-icon>
          </template>
        </n-button>

        <n-button
          v-if="!isCarted"
          color="#16a34a"
          @click="addToCart"
        >
          <template #icon>
            <n-icon>
              <AddShoppingCartFilled />
            </n-icon>
          </template>
          Add To Cart
        </n-button>


        <n-button
          v-if="isCarted"
          @click="removeFromCart"
        >
          <template #icon>
            <n-icon>
              <RemoveShoppingCartOutlined />
            </n-icon>
          </template>
          Remove From Cart
        </n-button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/core/types/product';
import { useMessage, NH4, NH2, NTag, NText, NIcon, NButton } from 'naive-ui';
import { HeartBrokenFilled, AddShoppingCartFilled, RemoveShoppingCartOutlined } from '@vicons/material'
import { productService } from '~/core/services/product.service';

const props = defineProps<{
  product: Product
}>()

const isCarted = ref(false)
const message = useMessage()
const like = async () => {
  try {
    const likedMessage = await productService.like(props.product._id)
    message.success(likedMessage)
  } catch (err) {
    console.error("Failed to like product:", err)
    message.error("Failed to like product")
  }
}


const addToCart = async () => {
  // достаем корзину или создаём пустую
  const cart: Product[] = JSON.parse(localStorage.getItem('products-cart') || '[]')

  // проверяем нет ли уже такого товара
  const exists = cart.some(item => item._id === props.product._id)
  if (!exists) {
    cart.push(props.product)
    localStorage.setItem('products-cart', JSON.stringify(cart))
    window.dispatchEvent(new Event("cart-updated"))
    message.success('Product added to the cart')
    isCarted.value = true
  }
}

const removeFromCart = async () => {
  const cart: Product[] = JSON.parse(localStorage.getItem('products-cart') || '[]')

  // фильтруем корзину, убирая текущий товар
  const updatedCart = cart.filter(item => item._id !== props.product._id)

  localStorage.setItem('products-cart', JSON.stringify(updatedCart))
  window.dispatchEvent(new Event("cart-updated"))

  message.success('Product was removed from the cart')

  isCarted.value = false
}

const checkIsCarted = () => {
  if (!localStorage.getItem('products-cart')) {
    return
  }
  const cartedProducts: Product[] = JSON.parse(localStorage.getItem('products-cart') as string)
  isCarted.value = cartedProducts.some((item) => item._id === props.product._id)
}



onMounted(() => {
  checkIsCarted()
})





</script>

<style scoped></style>