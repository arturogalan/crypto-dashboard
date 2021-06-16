// @ts-check
import { defineStore } from 'pinia'
import { fetchCryptoHistory } from '../services/coin-cap-api'
import {cryptoHistoryIntervals} from '../utils/baseConstants'

export const cryptoDetailStore = defineStore({
  id: 'cryptoDetail',
  state: () => ({
    cryptoId: '',
    cryptoHistory: [],
    interval: cryptoHistoryIntervals.MONTH,
  }),
  getters: {
    getCryptoHistory: (state) => {
      return state.cryptoHistory;
    }
  },  
  actions: {
    fetchCryptoHistory({currencyId, selectedInterval}) {
      if (this.cryptoId === currencyId && this.cryptoHistory.length && this.interval === selectedInterval) {
        return Promise.resolve();
      }
      this.cryptoId = currencyId;
      return fetchCryptoHistory({currencyId, selectedInterval}).then(({data})=> {
        this.cryptoHistory = data;
        this.interval = selectedInterval;
      });
    },
  },
})
