// @ts-check
import { defineStore } from 'pinia'
import { fetchCryptoVariants } from '../services/coin-cap-api'

export const cryptoStore = defineStore({
  id: 'crypto',
  state: () => ({
    cryptoList: [],
    sorting: {
      field: 'rank',
      order: 'asc',
    },
  }),
  getters: {
    sortedCryptoList: (state) => state.cryptoList.sort(function (a, b) {
      const field = state.sorting.field;
      if (isNaN(a[field])) {
        return a[field].localeCompare(b[field]);
      }
      return a[field] > (b[field]);

    }),
    cryptoProperties: (state) => (id) => {
      return state.cryptoList.find((crypto) => crypto.id === id)
    }
  },  
  actions: {
    fetchCryptoList() {
      if (this.cryptoList.length) {
        return Promise.resolve();
      }
      return fetchCryptoVariants().then(({data})=> {
        this.cryptoList = data.map((currency)=> {
          return {
            ...currency,
            logo: `https://www.cryptofonts.com/img/icons/${currency.symbol.toLowerCase()}.svg`,
          }
        });
      });
    },
    setCryptoListSorting(field) {
      this.sorting.field = field;
    }
  },
})
