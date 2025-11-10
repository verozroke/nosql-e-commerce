<script setup lang="ts">
import { NMessageProvider } from 'naive-ui';

</script>

<template>
  <div>
    <NMessageProvider>
      <nuxt-layout>
        <NuxtPage />
      </nuxt-layout>
    </NMessageProvider>

  </div>
</template>
