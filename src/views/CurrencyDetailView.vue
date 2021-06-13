<script>
import { cryptoStore } from '../store/crypto'
import { mapState } from 'pinia'
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
          title: 'market cap',
          type: '',
        },
        {
          id: 'priceUsd',
          title: 'last price',
          type: '',
        },
        {
          id: 'changePercent24Hr',
          title: 'change percent',
          type: '',
        },        
      ],      
    }
  },
  computed: {
    ...mapState(cryptoStore, ['cryptoProperties']),
    selectedCrypto() {
      return this.cryptoProperties(this.$route.params.cryptoId)
    },
  },
}
</script>
<template>
  <div class="absolute top-2 left-2">
    <router-link to="/">Cryptocurrencies</router-link> &gt;
    {{ $route.params.cryptoId }}
  </div>
  <base-card
    :card-properties="cardProperties"
    :card-content="selectedCrypto"
  >
  <template #title>
    {{ selectedCrypto.id }}
  </template>
  <template #subtitle>
    ({{ selectedCrypto.symbol }})
  </template>  
  </base-card>
</template>

<style></style>
