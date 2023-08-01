import { useCurrencyStore } from './CurrencyStore'
import { setActivePinia, createPinia } from 'pinia'

import { describe, expect, it, beforeEach } from 'vitest'
import { createApp } from 'vue'

const app = createApp({})
beforeEach(() => {
  const pinia = createPinia()
  app.use(pinia)
  setActivePinia(pinia)
})
describe('CurrencyStore', () => {
  it('should have correct initial state', () => {
    const store = useCurrencyStore()
    const { pageSize, latestCurrency, dateCurrency, changedCurrency } = store
    expect({ pageSize, latestCurrency, dateCurrency, changedCurrency }).to.deep.equal({
      pageSize: 10,
      latestCurrency: [],
      dateCurrency: [],
      changedCurrency: []
    })
  })
})
describe('getters', () => {
  it('should get correct data from getSpecificCurrency function', () => {
    const store = useCurrencyStore()
    const initialSpecificCurrency = store.getSpecificCurrency(1)
    expect(initialSpecificCurrency).to.equal(undefined)
    store.latestCurrency = [
      {
        r030: 36,
        txt: 'Австралійський долар',
        rate: 24.3199,
        cc: 'AUD',
        exchangedate: '04.07.2023'
      }
    ]
    const specificCurrency = store.getSpecificCurrency('AUD')
    expect(specificCurrency).to.deep.equal({
      r030: 36,
      txt: 'Австралійський долар',
      rate: 24.3199,
      cc: 'AUD',
      exchangedate: '04.07.2023'
    })
  })
})
describe('actions', () => {
  it('should get correct currency from getCurrencyByDate method', async () => {
    const store = useCurrencyStore()

    await store.getCurrencyByDate(20230704)
    const dateCurrency = store.dateCurrency
    expect(dateCurrency[0]).to.deep.equal({
      r030: 36,
      txt: 'Австралійський долар',
      rate: 24.3199,
      cc: 'AUD',
      exchangedate: '04.07.2023'
    })
  })

  it('should save and retrieve currency from localStorage successfully', () => {
    const store = useCurrencyStore()
    const data = [
      { r030: 348, txt: 'Форинт', rate: 0.10636, cc: 'HUF', exchangedate: '04.07.2023' },
      { r030: 392, txt: 'Єна43', rate: 0.25451, cc: 'JPY', exchangedate: '07.07.2023' }
    ]
    store.saveToLocalStorage(data)
    const changedCurrency = store.getChangedCurrencyFromLocalStorage()
    expect(changedCurrency).to.deep.equal([
      { r030: 348, txt: 'Форинт', rate: 0.10636, cc: 'HUF', exchangedate: '04.07.2023' },
      { r030: 392, txt: 'Єна43', rate: 0.25451, cc: 'JPY', exchangedate: '07.07.2023' }
    ])
  })
  it('should update currency item', () => {
    const store = useCurrencyStore()
    const currency = {
      r030: 392,
      txt: 'Єна43',
      rate: 0.25451,
      cc: 'JPY',
      exchangedate: '07.07.2023'
    }
    const items = [
      { r030: 348, txt: 'Форинт', rate: 0.10636, cc: 'HUF', exchangedate: '04.07.2023' },
      { r030: 392, txt: 'Єна43', rate: 0.25451, cc: 'JPY', exchangedate: '07.07.2023' }
    ]
    localStorage.setItem('changed-currency', JSON.stringify(items))
    store.changedCurrency = items
    store.updateCurrency({ r030: 392, txt: 'Єна', rate: 50, cc: 'JPY', exchangedate: '07.07.2023' })
    expect(store.changedCurrency).to.deep.equal([
      { r030: 348, txt: 'Форинт', rate: 0.10636, cc: 'HUF', exchangedate: '04.07.2023' },
      { r030: 392, txt: 'Єна', rate: 50, cc: 'JPY', exchangedate: '07.07.2023' }
    ])
  })
})
