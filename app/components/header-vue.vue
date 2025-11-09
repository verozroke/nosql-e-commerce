<template>
  <div class="text-slate-100 bg-slate-900 h-12 flex items-center gap-8 px-20">

    <!-- LOGO -->
    <nuxt-link
      href="/"
      class="flex-1 text-xl font-bold tracking-tight underline underline-offset-4"
    >
      ECommerce Assignment.
    </nuxt-link>

    <!-- IF LOGGED IN -->
    <template v-if="isLoggedIn">
      <nav class="flex items-center gap-4">
        <nuxt-link
          class="hover:underline font-medium"
          href="/"
        >Recommendations</nuxt-link>
        <nuxt-link
          class="hover:underline font-medium"
          href="/catalog"
        >Catalog</nuxt-link>
      </nav>

      <NuxtLink href="/cart">
        <n-badge
          :value="cartCount"
          :max="15"
        >
          <n-button
            strong
            quaternary
            circle
          >
            <template #icon>
              <n-icon
                size="24"
                color="#fff"
              >
                <ShoppingCartOutlined />
              </n-icon>
            </template>
          </n-button>
        </n-badge>

      </NuxtLink>

      <NuxtLink href="/profile">
        <n-button
          strong
          quaternary
          circle
        >
          <template #icon>
            <n-icon
              size="28"
              color="#fff"
            >
              <PersonOutlined />
            </n-icon>
          </template>
        </n-button>
      </NuxtLink>
    </template>

    <!-- IF NOT LOGGED IN -->
    <template v-else>
      <n-button
        type="primary"
        @click="goToSignIn"
      >Sign In</n-button>
    </template>

  </div>
</template>

<script setup lang="ts">
import { NIcon, NButton, NBadge } from 'naive-ui';

import { ShoppingCartOutlined, PersonOutlined } from '@vicons/material'

const router = useRouter()

const isLoggedIn = ref(false)
const cartCount = ref(0)

onMounted(() => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
  syncCart()
  window.addEventListener("cart-updated", syncCart)
})



function syncCart() {
  cartCount.value = JSON.parse(localStorage.getItem('products-cart') || '[]').length
}



function goToSignIn() {
  router.push('/sign-in')
}
</script>

<style scoped></style>