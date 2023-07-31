<template>
  <form @submit.prevent="updateCurrency" v-if="newCurrency">
    <label>
      <span class="title">Офіційний курс</span>
      <input
        type="text"
        v-model="newCurrency.rate"
        data-input="rate"
        ref="elRateInput"/>
    </label>
    <label>
      <span class="title">Назва валюти</span>
      <input
        type="text"
        data-input="txt"
        v-model="newCurrency.txt" />
    </label>
  </form>
  <button data-input="submit" @click="updateCurrency">Оновити</button>
</template>

<script setup lang="ts">
import { useCurrencyStore } from '../stores/CurrencyStore'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const currencyStore = useCurrencyStore()
const currentCurrency = currencyStore.getSpecificCurrency(route.params.id as string)
const newCurrency = ref(currentCurrency)

const elRateInput = ref<HTMLInputElement | null>(null)
function updateCurrency() {
  currencyStore.updateCurrency(newCurrency.value || undefined)
  router.push('/changed-currency')
}
onMounted(() => {
  elRateInput.value?.focus()
})
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
label {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}
.title {
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 16px;
}
input {
  padding: 12px;
  font-size: 16px;
}
button {
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  background: #0069ed;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
}

button:hover,
button:focus {
  background: #0053ba;
}

button:focus {
  outline: 1px solid #fff;
  outline-offset: -4px;
}

button:active {
  transform: scale(0.99);
}
</style>
../stores/CurrencyStoreStore