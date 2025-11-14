<template>
  <div class="w-screen min-h-screen overflow-x-hidden flex flex-col px-20 py-10">
    <n-h1>
      Product Details
    </n-h1>
    <div class="p-10 w-full max-w-full flex gap-12 items-start justify-between">
      <!-- LEFT SIDE — CART LIST -->
      <div
        class="flex-1"
        style="max-width: 900px;"
      >

        <n-list
          v-if="cart.length"
          class="space-y-4"
        >
          <n-list-item
            v-for="product in cart"
            :key="product.id"
            style="max-width: 800px;"
          >
            <n-thing
              :title="product.name"
              class="flex items-center gap-4"
            >

              <template #avatar>
                <NuxtImg
                  :src="product.image_url"
                  width="80"
                  height="80"
                  class="rounded-md object-cover"
                />
              </template>

              <template #description>
                <b>{{ product.price }} тенге</b> <br>
                <n-p>
                  {{ product.description }}
                </n-p>
              </template>

              <n-space
                justify="end"
                class="ml-auto"
              >
                <n-button
                  tertiary
                  size="small"
                  @click="goToProduct(product.id)"
                >
                  <template #icon>
                    <RemoveRedEyeOutlined />
                  </template>
                  View
                </n-button>

                <n-button
                  type="error"
                  tertiary
                  size="small"
                  @click="remove(product.id)"
                >
                  <template #icon>
                    <DeleteFilled />
                  </template>
                  Remove
                </n-button>
              </n-space>

            </n-thing>
          </n-list-item>
        </n-list>

        <n-p
          v-else
          depth="3"
          class="mt-10 text-center"
        >
          Cart is empty
        </n-p>
      </div>


      <!-- RIGHT SIDE — CHECKOUT PANEL -->
      <div style="width: 600px; flex-shrink: 0;">
        <n-card
          bordered
          size="large"
        >
          <n-h3>Checkout</n-h3>

          <n-p>You have <strong>{{ cart.length }}</strong> items in your cart.</n-p>

          <n-h6>Total</n-h6>
          <n-p
            strong
            class="text-xl mb-4"
          >
            {{ totalPrice }} ₸
          </n-p>

          <n-space
            vertical
            size="large"
          >
            <n-input
              v-model:value="address"
              placeholder="Delivery Address"
            />
            <n-input
              v-model:value="phone"
              placeholder="Phone Number"
            />

            <n-button
              type="primary"
              size="large"
              block
              @click="purchase"
            >
              <template #icon>
                <AttachMoneyOutlined />
              </template>
              Purchase
            </n-button>
          </n-space>
        </n-card>
      </div>

    </div>

  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { Product } from '~/core/types/product'
import { DeleteFilled, RemoveRedEyeOutlined, AttachMoneyOutlined } from '@vicons/material'
import {
  useMessage,
  NCard,
  NButton,
  NInput,
  NList,
  NListItem,
  NThing,
  NSpace,
  NH6,
  NH3,
  NH1,
  NP
} from 'naive-ui'
import { productService } from '~/core/services/product.service'
const router = useRouter()
const message = useMessage()

const cart = ref<Product[]>([])
const address = ref('')
const phone = ref('')

onMounted(() => {
  if (!localStorage.getItem('token')) {
    router.push('/sign-in')
    return
  }


  cart.value = JSON.parse(localStorage.getItem('products-cart') || '[]')
})

function remove(id: string) {
  cart.value = cart.value.filter(p => p.id !== id)
  localStorage.setItem('products-cart', JSON.stringify(cart.value))
  window.dispatchEvent(new Event("cart-updated"))

  message.info("Removed from cart")
}

function goToProduct(id: string) {
  router.push(`/product/${id}`)
}

const totalPrice = computed(() =>
  cart.value.reduce((sum, p) => sum + p.price, 0)
)

async function purchase() {
  if (!cart.value.length) {
    return message.warning("Cart is empty")
  }

  const responseMessage = await productService.purchase(cart.value)
  message.success(responseMessage)

  cart.value = []
  localStorage.setItem('products-cart', '[]')
  window.dispatchEvent(new Event("cart-updated"))
  address.value = ''
  phone.value = ''
}


</script>
