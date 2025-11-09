<template>
  <div class="bg-slate-100 w-screen min-h-screen overflow-x-hidden flex flex-col px-20 py-10">
    <n-h1>
      Product Details
    </n-h1>
    <div
      v-if="product"
      class="py-8 space-y-4 flex gap-8"
    >
      <NuxtImg
        :src="product.image_url"
        alt="product image"
        class="w-64 h-auto rounded"
      />
      <div class="flex flex-col">

        <n-h1 class="text-2xl font-bold">{{ product.name }}</n-h1>

        <n-tag
          class='w-fit mb-2 capitalize'
          :bordered="false"
          type="success"
        >
          {{ product.category }}
        </n-tag>
        <n-p class="text-lg">{{ product.description }}</n-p>

        <n-h1 class="text-xl font-semibold">
          {{ product.price }} тенге
        </n-h1>


        <div class="flex gap-4">
          <n-button
            tertiary
            type="error"
            @click="like"
          >
            <template #icon>
              <n-icon>
                <HeartBrokenFilled />
              </n-icon>
            </template>
            Like

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

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { productService } from "~/core/services/product.service"
import type { Product } from "~/core/types/product"
import { useMessage, NTag, NH1, NButton, NP, NIcon } from "naive-ui"
import { HeartBrokenFilled, AddShoppingCartFilled, RemoveShoppingCartOutlined } from '@vicons/material'

const route = useRoute()
const product = ref<Product | null>(null)
const productId = route.params.id as string

async function getProduct() {
  try {
    product.value = await productService.product(productId)
    const viewedMessage = await productService.view(productId)
    message.success(viewedMessage)
  } catch (err) {
    console.error("Failed to load product:", err)
    message.error("Failed to load product")
  }
}



const isCarted = ref(false)
const message = useMessage()

const like = async () => {
  try {
    const likedMessage = await productService.like(productId)
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
  const exists = cart.some(item => item._id === product.value?._id)
  if (!exists) {
    cart.push(product.value as Product)
    localStorage.setItem('products-cart', JSON.stringify(cart))
    window.dispatchEvent(new Event("cart-updated"))

    message.success('Product added to the cart')
    isCarted.value = true
  }
}

const removeFromCart = async () => {
  const cart: Product[] = JSON.parse(localStorage.getItem('products-cart') || '[]')
  // фильтруем корзину, убирая текущий товар
  const updatedCart = cart.filter(item => item._id !== product.value?._id)

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
  isCarted.value = cartedProducts.some((item) => item._id === product.value?._id)
}


onMounted(async () => {
  await getProduct()
  checkIsCarted()
})


</script>

<style scoped></style>
