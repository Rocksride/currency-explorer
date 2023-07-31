import { defineStore } from 'pinia'
import CurrencyService from '../services/CurrencyService'
import type { CurrencyShape } from '@/types'

type CurrencyStoreShape = {
  pageSize: number,
  latestCurrency: CurrencyShape[]
  dateCurrency: CurrencyShape[]
  changedCurrency: CurrencyShape[]
}

export const useCurrencyStore = defineStore('currencyStore', {
  state: (): CurrencyStoreShape => ({
    pageSize: 10,
    latestCurrency: [],
    dateCurrency: [],
    changedCurrency: []
  }),
  getters: {
    getSpecificCurrency: (state) => (id: string | number): CurrencyShape | undefined => {
      return state.latestCurrency.find((el: CurrencyShape) => el.cc === id)
    }
  },
  actions: {
    async getCurrencyByDate(date: string | number): Promise<CurrencyShape[]> {
      const currency = await CurrencyService.getCurrencyByDate(date)
      this.dateCurrency = currency.data
      return currency.data
    },
    async getLatestCurrency(): Promise<CurrencyShape[]> {
      const _currency = await CurrencyService.getLatestCurrency()
      this.latestCurrency = _currency.data
      return _currency.data
    },
    getChangedCurrencyFromLocalStorage(): CurrencyShape[] | undefined {
      try {
        const changedCurrency = JSON.parse(localStorage.getItem('changed-currency') || '[]')
        this.changedCurrency = changedCurrency
        return changedCurrency
      } catch(err) {}
    },
    saveToLocalStorage(data: CurrencyShape[]): void {
      localStorage.setItem('changed-currency', JSON.stringify(data))
    },
    updateCurrency(currency: CurrencyShape | undefined) {
      if (!currency) return
      try {
        const items: CurrencyShape[] = JSON.parse(localStorage.getItem('changed-currency') || '[]')
        let updatedItems
        if (items) {
          const index = items.findIndex(el => el.cc === currency.cc)
          if (index === -1) {
            updatedItems = items;
            updatedItems.push(currency)
          } else {
            updatedItems = items.map(el => {
              return el.cc === currency.cc ?
                currency :
                el
            })
          }
        } else {
          updatedItems = [currency]
        }
        localStorage.setItem('changed-currency', JSON.stringify(updatedItems))
        this.changedCurrency = updatedItems
      } catch (err) {
        console.error(err)
      }
    }
  }
})
