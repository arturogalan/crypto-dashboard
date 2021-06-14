// @ts-check
import { defineStore } from 'pinia'
import { fetchCryptoHistory } from '../services/coin-cap-api'

export const cryptoDetailStore = defineStore({
  id: 'cryptoDetail',
  state: () => ({
    cryptoId: '',
    cryptoHistory: [],
  }),
  getters: {
    getCryptoHistory: (state) => {
      return state.cryptoHistory;
    }
  },  
  actions: {
    fetchCryptoHistory(currencyId) {
      console.log('trying to get currencyId', currencyId, 'already stored', this.cryptoId)
      if (this.cryptoId === currencyId && this.cryptoHistory.length) {
        return Promise.resolve();
      }
      this.cryptoId = currencyId;
      return fetchCryptoHistory(currencyId).then(({data})=> {
        this.cryptoHistory = data;
      });
    },
  },
})
