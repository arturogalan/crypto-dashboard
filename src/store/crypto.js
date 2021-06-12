// @ts-check
import { defineStore } from 'pinia'
import { fetchCryptoVariants } from '../services/coin-cap-api'

export const cryptoStore = defineStore({
  id: 'user',
  state: () => ({
    cryptoList: [],
  }),
  getters: {
    cryptoVariants: (state) => state.cryptoList,
  },  
  actions: {
    fetchCryptoVariants() {
      return fetchCryptoVariants().then(({data})=> {
        this.cryptoList = data;
      });
    }
  },
})
