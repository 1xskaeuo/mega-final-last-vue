<template>
  <div class="min-h-screen flex flex-col bg-white font-[Inter,system-ui,sans-serif]">
    <AppHeader />
    <main class="flex-1 pt-[81px]">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>
