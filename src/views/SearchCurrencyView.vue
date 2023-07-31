<script setup lang="ts">
import { useCurrencyStore } from '../stores/CurrencyStore'
import Table from '../components/Table.vue'
import { onMounted, ref } from 'vue'

function stringToDate(date: string) {
  const [y, m, d] = date.split('-')
  return y + `${m}`.padStart(2, '0') + `${d}`.padStart(2, '0')
}
function formatDate(date: Date) {
  return date.getFullYear() + '-' + `${date.getMonth() + 1}`.padStart(2, '0') + '-' + `${date.getDate()}`.padStart(2, '0')
}
function handleChange(e: Event) {
  const target = e.target
  if (target) {
    const date = stringToDate((target as HTMLButtonElement).value)
    currencyStore.getCurrencyByDate(date)
  }
}

const today = formatDate(new Date())
const maxDate = ref(today)
const date = ref(today)
const currencyStore = useCurrencyStore()

const elDateInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  elDateInput.value?.focus()
})
</script>

<template>
  <main>
    <h1 class="heading">Всі курси валют на <span> {{ date }}</span></h1>
    <input
      type="date"
      class="date-input"
      v-model="date"
      @change="handleChange"
      :max="maxDate"
      ref="elDateInput"
    />
    <Table
      v-if="currencyStore.dateCurrency.length"
      :items="currencyStore.dateCurrency"
      :routePrefix="'search-currency'"
    />
    <h2 v-else class="caption">На цю дату даних про курс валют немає. Оберіть іншу дату</h2>
  </main>
</template>

<style scoped>
.date-input {
  padding: 8px 14px;
  font-size: 20px;
  line-height: 1.42857143;
  color: #337ab7;
  width: 100%;
  margin-bottom: 10px;
}
main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
../stores/CurrencyStoreStore