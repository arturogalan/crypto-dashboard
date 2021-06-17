// @ts-check
import { defineStore } from 'pinia'
import { fetchCryptoVariants } from '../services/coin-cap-api'
import { pollingConstants } from '../utils/baseConstants'
import { mergeCryptoList } from '../utils/dataUtils'

export const cryptoStore = defineStore({
  id: 'crypto',
  state: () => ({
    cryptoList: [],
    sorting: {
      field: 'rank',
      direction: 'asc',
    },
    pollingStatus: {
      timerId: undefined,
      isRealTimeActive: false,
    },
  }),
  getters: {
    sortedCryptoList: (state) => state.cryptoList.sort(function (a, b) {
      const field = state.sorting.field;
      if (isNaN(a[field])) {
        return (a[field].localeCompare(b[field]) * (state.sorting.direction === 'asc' ? 1 : -1));
      }
      return (Number(a[field]) > Number(b[field]) ? 1 : -1) * (state.sorting.direction === 'asc' ? 1 : -1);

    }),
    cryptoProperties: (state) => (id) => {
      return state.cryptoList.find((crypto) => crypto.id === id)
    },
    isRealTimeActive: (state)=> state.pollingStatus.isRealTimeActive,
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
    setCryptoListSorting(sorting) {
      this.sorting.field = sorting.field;
      this.sorting.direction = sorting.direction;
    },
    startPeriodicFetchCryptoList() {
      console.log('starting check')
      const timerId = setInterval(()=> {
        fetchCryptoVariants().then(({data})=> {
          mergeCryptoList(this.cryptoList, data);
        })
      }, pollingConstants.INITIAL_POLLING_INTERVAL);
      this.pollingStatus.isRealTimeActive = true;
      this.pollingStatus.timerId = timerId;
    },
    cancelPeriodicFetchCryptoList() {
      console.log('canceling check')
      clearInterval(this.pollingStatus.timerId);
      this.pollingStatus.timerId = undefined;
      this.pollingStatus.isRealTimeActive = false;
    },
  },
})


