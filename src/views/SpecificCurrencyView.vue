<template>
  <main v-if="currentCurrency">
    <h1 class="heading">Оновіть валюту {{ currentCurrency.txt }}</h1>
    <CurrencyForm />
  </main>
</template>

<script setup lang="ts">
import CurrencyForm from '../components/CurrencyForm.vue'
import { useCurrencyStore } from '../stores/CurrencyStore'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const currencyStore = useCurrencyStore()
const currentCurrency = currencyStore.getSpecificCurrency(route.params.id as string)
const newCurrency = ref(currentCurrency)
</script>

../stores/CurrencyStoreStore