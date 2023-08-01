import { expect, it, describe, expectTypeOf } from 'vitest'
import type { CurrencyShape } from '@/types'
import CurrencyService from '@/services/CurrencyService'

describe('CurrencyService', () => {
  it('should have correct data shape', async () => {
    const data = await CurrencyService.getLatestCurrency()
    expectTypeOf(data).toEqualTypeOf<CurrencyShape[]>
  })
  it('should return correct results /getCurrencyByDate: 2023-07-04', async () => {
    const date = 20230704
    const { data } = await CurrencyService.getCurrencyByDate(date)
    expect(data[0]).to.deep.equal({
      r030: 36,
      txt: 'Австралійський долар',
      rate: 24.3199,
      cc: 'AUD',
      exchangedate: '04.07.2023'
    })
    expect(data[data.length-1]).to.deep.equal({
      r030: 964,
      txt: 'Паладій',
      rate: 45034.6,
      cc: 'XPD',
      exchangedate: '04.07.2023'
    })
  })
  it('should return array from getLatestCurrency method', async () => {
    const { data } = await CurrencyService.getLatestCurrency()
    expect(Array.isArray(data)).toBe(true)
    expectTypeOf(data).toEqualTypeOf<CurrencyShape[]>
  })
})
