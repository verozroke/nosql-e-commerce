<script setup lang="ts">
import { NMessageProvider } from 'naive-ui';
</script>

<template>
  <div>
    <NMessageProvider>
      <HeaderVue />
      <NuxtPage />
    </NMessageProvider>
  </div>
</template>
