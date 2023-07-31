import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://bank.gov.ua',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async getCurrencyByDate(date: string | number) {
    const data = await apiClient.get(`/NBUStatService/v1/statdirectory/exchange?date=${date}&json`);
    return data
  },
  async getLatestCurrency() {
    const data = await apiClient.get(`/NBUStatService/v1/statdirectory/exchange?json`)
    return data
  },
}