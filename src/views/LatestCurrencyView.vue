<script setup lang="ts">
import { useCurrencyStore } from '../stores/CurrencyStore'
import Table from '../components/Table.vue'

const currencyStore = useCurrencyStore()
</script>

<template>
  <main>
    <h1 class="heading">Всі курси валют</h1>
    <Table :items="currencyStore.latestCurrency" :routePrefix="'latest-currency'" />
  </main>
</template>

<style scoped>
</style>../stores/CurrencyStoreStore