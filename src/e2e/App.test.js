const puppeteer = require('puppeteer')
import { describe, it, expect, beforeAll, afterAll } from 'vitest'


describe('e2e', () => {
  let browser, page
  async function clearInput() {
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
  }
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      devtools: true
    })
    page = await browser.newPage()
    await page.goto('http://localhost:5173')
    page.setViewport({ width: 500, height: 1200 })
  })

  it('should render navbar', async () => {
    const innerText = await page.$eval('.nav', e => e.innerText)
    expect(innerText).toBe('Головна\nЗмінені\nПошук')
  }, 16000)

  it('currency change form flow', async () => {
    await page.goto('http://localhost:5173/currency/AUD')

    await page.click('form > label:nth-child(1) > input[type=text]')
    await clearInput()
    await page.type('form > label:nth-child(1) > input[type=text]', '25')

    await page.click('form > label:nth-child(2) > input[type=text]')
    await clearInput()
    await page.type('form > label:nth-child(2) > input[type=text]', 'Австралійський Долар')

    await page.click('[data-input="submit"]')
    await page.goto('http://localhost:5173/changed-currency')
    const name = await page.$eval('table > tr:nth-child(2) > td:nth-child(1)', e => e.innerText)
    const rate = await page.$eval('table > tr:nth-child(2) > td:nth-child(4)', e => e.innerText)
    expect(name).toBe('Австралійський Долар')
    expect(rate).toBe('25')

  }, 160000)

  it('search by name flow', async () => {
    await page.goto('http://localhost:5173')
    await page.click('.table-header__search')
    await clearInput()
    await page.type('.table-header__search', 'Форинт')


    const name = await page.$eval('#app > main > table > tr > td:nth-child(1)', e => e.innerText)
    expect(name).toBe('Форинт')

  }, 160000)

  it('search by 2023-07-25', async () => {
    await page.goto('http://localhost:5173/search-currency')
    await page.focus('[data-input="date-input"]')
    await page.$eval('[data-input="date-input"]', e => e.type = 'text')
    const input = await page.$('[data-input="date-input"]')
    await page.$eval('[data-input="date-input"]', e => e.value = '2023-07-25')
    await page.$eval('[data-input="date-input"]', e => e.type = 'date')
    await page.focus('[data-input="date-input"]')
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowDown');

    const name = await page.$eval('#app > main > table > tr:nth-child(2) > td:nth-child(1)', e => e.innerText)
    const rate = await page.$eval('#app > main > table > tr:nth-child(2) > td:nth-child(4)', e => e.innerText)
    expect(name).toBe('Австралійський долар')
    expect(rate).toBe('24.6619')
    
  }, 160000)

  afterAll(() => {
    browser.close()
  })
})
