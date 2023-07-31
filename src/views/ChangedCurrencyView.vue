<template>
  <main>
    <h1 class="heading">Змінені курси</h1>
    <Table v-if="currencyStore.changedCurrency && currencyStore.changedCurrency.length" :items="currencyStore.changedCurrency" :routePrefix="'changed-currency'" />
    <h2 v-else>Поки що ви не змінили жодних курсів валют</h2>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCurrencyStore } from '../stores/CurrencyStore';
import Table from '../components/Table.vue'
const currencyStore = useCurrencyStore()
onMounted(() => {
  currencyStore.getChangedCurrencyFromLocalStorage()
})
</script>

<style scoped>

</style>
../stores/CurrencyStoreStore