<template>
  <div
    v-if="loading"
    class="p-8 text-center opacity-60"
  >
    Loading profile...
  </div>

  <div
    v-else-if="user"
    class="p-8 space-y-6"
  >
    <h1 class="text-3xl font-bold">Profile</h1>

    <div class="text-lg">
      Username: <strong>{{ user.username }}</strong>
    </div>

    <div class="text-sm opacity-60">
      Joined: {{ new Date(user.created_at).toLocaleDateString() }}
    </div>

    <h2 class="text-2xl font-semibold mt-6">Your Activity</h2>

    <div class="flex flex-col gap-2">
      <n-alert
        v-for="interaction in interactions"
        :key="interaction.id"
        :title="interaction.action_type.toUpperCase()"
        :type="actionTypeMap[interaction.action_type as keyof typeof actionTypeMap]"
      >
        <template #icon>
          <n-icon size="24">
            <RemoveRedEyeOutlined v-if="interaction.action_type === 'like'" />
            <HeartBrokenOutlined v-if="interaction.action_type === 'purchase'" />
            <AttachMoneyOutlined v-if="interaction.action_type === 'view'" />
          </n-icon>
        </template>

        <div>Product: {{ interaction.product_id }}</div>
        <div class="opacity-60 text-sm">
          {{ new Date(interaction.timestamp).toLocaleString() }}
        </div>
      </n-alert>
    </div>
  </div>

  <div
    v-else
    class="p-8 text-center"
  >
    Could not load profile
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '~/core/services/auth.service'
import { productService } from '~/core/services/product.service'
import type { Interaction } from '~/core/types/interaction'
import type { User } from '~/core/types/user'
import {
  RemoveRedEyeOutlined,
  HeartBrokenOutlined,
  AttachMoneyOutlined
} from '@vicons/material'
import { NIcon, NAlert } from 'naive-ui'
const router = useRouter()
const user = ref<User | null>(null)
const interactions = ref<Interaction[]>([])
const loading = ref(true)

const actionTypeMap: Record<string, 'info' | 'success' | 'error'> = {
  'view': 'info',
  'purchase': 'success',
  'like': 'error'
}

async function loadProfile() {
  user.value = await authService.me()

  if (!user.value) {
    return router.push('/sign-in')
  }

  interactions.value = (await productService.interactions()).reverse()
  loading.value = false
}

onMounted(() => {
  if (!localStorage.getItem('token')) {
    router.push('/sign-in')
    return
  }

  loadProfile()
})
</script>

<style scoped></style>