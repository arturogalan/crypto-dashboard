<script>
import { cryptoStore } from '../store/crypto'
import { cryptoDetailStore } from '../store/cryptoDetail'

import { mapActions, mapState } from 'pinia'
import BaseCard from '../components/BaseCard.vue'
import BaseChart from '../components/BaseChart.vue'

export default {
  components: {
    BaseCard,
    BaseChart,
  },
  data() {
    return {
      cryptoProps: [
        'name',
        'symbol',
        'priceUsd',
        'changePercent24Hr',
        'explorer',
        'id',
        'marketCapUsd',
        'maxSupply',
        'rank',
        'supply',
        'volumeUsd24Hr',
        'vwap24Hr',
      ],
      cardProperties: [
        {
          id: 'marketCapUsd',
          title: 'Market cap',
          type: 'currency',
        },
        {
          id: 'priceUsd',
          title: 'Last price',
          type: 'currency',
        },
        {
          id: 'changePercent24Hr',
          title: 'Change percent',
          type: 'percentage',
        },
        {
          id: 'maxSupply',
          title: 'Max supply',
          type: 'integer',
        },
        {
          id: 'volumeUsd24Hr',
          title: 'Volume traded last 24h',
          type: 'currency',
        },
        {
          id: 'vwap24Hr',
          title: 'Volume Weighted Average Price last 24h',
          type: 'currency',
        },
      ],      
    }
  },
  mounted() {
    Promise.all([
      this.fetchCryptoList(),
      this.fetchCryptoHistory(this.$route.params.cryptoId),
    ])
    // this.fetchCryptoList().then(()=> {
    //   this.fetchCryptoHistory(this.$route.params.cryptoId);
    // })
  },
  methods: {
    ...mapActions(cryptoStore, ['fetchCryptoList']),
    ...mapActions(cryptoDetailStore, ['fetchCryptoHistory']),
  },  
  computed: {
    ...mapState(cryptoStore, ['cryptoProperties']),
    ...mapState(cryptoDetailStore, ['cryptoHistory']),
    selectedCrypto() {
      return this.cryptoProperties(this.$route.params.cryptoId) || {};
    },
  },
}
</script>
<template>
  <div class="w-auto text-left ml-8">
    <router-link to="/">Cryptocurrencies</router-link> &gt;
    {{ $route.params.cryptoId }}
  </div>
  <base-card
    :card-properties="cardProperties"
    :card-content="selectedCrypto"
  >
  <template #title>
    <div class="flex content-center items-center justify-center">
      <img class="w-10 h-10 ml-2 mr-2" :src="selectedCrypto.logo" />
      <div>
        {{ selectedCrypto.id }}
      </div>
    </div>
  </template>
  <template #subtitle>
    ({{ selectedCrypto.symbol }})
  </template>  
  </base-card>
  <base-chart
    v-if="cryptoHistory.length"
    :graph-labels="cryptoHistory.map((point)=> $d(point.date, 'short'))"
    :graph-data="cryptoHistory.map((point)=> point.priceUsd)"
    class="mt-3"
  />
</template>

<style></style>
