<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'

import { onMounted } from 'vue'
import { useCurrencyStore } from './stores/CurrencyStore';
const currencyStore = useCurrencyStore()
onMounted(() => {
  currencyStore.getLatestCurrency()
})
</script>

<template>
  <TheHeader />
  <RouterView />
</template>

<style scoped>

</style>
./stores/CurrencyStoreStore