<template>
  <nuxt-layout :name="'sign'">
    <NCard
      title="Sign Up"
      size="medium"
      class="max-w-xl"
    >
      <n-form
        ref="formRef"
        :model="modelRef"
        :rules="rules"
      >
        <n-form-item
          path="username"
          label="Username"
        >
          <n-input
            v-model:value="modelRef.username"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item
          path="password"
          label="Password"
        >
          <n-input
            v-model:value="modelRef.password"
            type="password"
            @input="handlePasswordInput"
            @keydown.enter.prevent
          />
        </n-form-item>

        <n-form-item
          ref="rPasswordFormItemRef"
          first
          path="reenteredPassword"
          label="Re-enter Password"
        >
          <n-input
            v-model:value="modelRef.reenteredPassword"
            :disabled="!modelRef.password"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
        <NuxtLink
          href="/sign-in"
          class="text-slate-700/70 hover:underline"
        >Already registered?</NuxtLink>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button
                :disabled="modelRef.username === null"
                round
                type="primary"
                @click="handleValidateButtonClick"
              >
                Sign Up
              </n-button>
            </div>
          </n-col>
        </n-row>
      </n-form>
    </NCard>
  </nuxt-layout>
</template>

<script setup lang="ts">
import { NCard, type FormInst, type FormItemRule, type FormRules, type FormValidationError, NRow, NCol, NButton, NForm, NFormItem, NInput, useMessage, type FormItemInst } from 'naive-ui'
import { authService, type SignUpBody } from '~/core/services/auth.service'
definePageMeta({
  layout: 'sign'
})


interface ModelType {
  username: string | null
  password: string | null
  reenteredPassword: string | null,
}


const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const message = useMessage()
const router = useRouter()
const modelRef = ref<ModelType>({
  username: null,
  password: null,
  reenteredPassword: null,
})


const rules: FormRules = {
  username: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Username is required')
        }
        else if (!/^\d*$/.test(value)) {
          return new Error('Username should be an integer')
        }
        else if (Number(value) < 18) {
          return new Error('Username should be above 18')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Password is required')
        }
        else if (Number(value) < 8 || Number(value) > 18) {
          return new Error('Username should be above 8 and below 20')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],

  reenteredPassword: [
    {
      required: true,
      message: 'Re-entered password is required',
      trigger: ['input', 'blur']
    },
    {
      validator: validatePasswordStartWith,
      message: 'Password is not same as re-entered password!',
      trigger: 'input'
    },
    {
      validator: validatePasswordSame,
      message: 'Password is not same as re-entered password!',
      trigger: ['blur', 'password-input']
    }
  ]
}


function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(async (errors: Array<FormValidationError> | undefined) => {
    if (!errors) {
      const payload: SignUpBody = {
        username: modelRef.value.username as string,
        password: modelRef.value.password as string,
      }
      try {
        const signedUpMessage = await authService.signUp(payload)
        message.success(signedUpMessage)


        const signedInMessage = await authService.signIn(payload)
        message.success(signedInMessage)

        router.push('/')



      } catch {
        console.log(errors)
        message.error('Invalid Login or Pasword')
      }

      return
    }

    console.log(errors)
    message.error('Invalid Login or Pasword')
  })
}

function handlePasswordInput() {
  if (modelRef.value.reenteredPassword) {
    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
  }
}



function validatePasswordStartWith(rule: FormItemRule, value: string): boolean {
  return (
    !!modelRef.value.password
    && modelRef.value.password.startsWith(value)
    && modelRef.value.password.length >= value.length
  )
}

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === modelRef.value.password
}

onMounted(() => {
  if (localStorage.getItem('token')) {
    router.push('/')
    return
  }

})

</script>

<style scoped></style>