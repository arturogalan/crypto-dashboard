<script>
import { cryptoStore } from '../store/crypto'
import { mapActions, mapState } from 'pinia'
import BaseCard from '../components/BaseCard.vue'

export default {
  components: {
    BaseCard,
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
      ],      
    }
  },
  mounted() {
    this.fetchCryptoList()
  },
  methods: {
    ...mapActions(cryptoStore, ['fetchCryptoList']),
  },  
  computed: {
    ...mapState(cryptoStore, ['cryptoProperties']),
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
    <!-- {{ selectedCrypto.id }} -->
  </template>
  <template #subtitle>
    ({{ selectedCrypto.symbol }})
  </template>  
  </base-card>
</template>

<style></style>
