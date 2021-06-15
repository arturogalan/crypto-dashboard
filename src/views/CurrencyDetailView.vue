<script>
import { cryptoStore } from '../store/crypto'
import { cryptoDetailStore } from '../store/cryptoDetail'

import { mapActions, mapState } from 'pinia'
import BaseCard from '../components/BaseCard.vue'
import BaseChart from '../components/BaseChart.vue'
import image from '../assets/image-not-found.png'

export default {
  components: {
    BaseCard,
    BaseChart,
  },
  data() {
    return {
      isLoaded: false,
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
      cardProperties: [],      
    }
  },
  mounted() {
    this.cardProperties = [
      {
        id: 'marketCapUsd',
        title: this.$t('common_ui.currency_columns.marketCapUsd'),
        type: 'currency',
      },
      {
        id: 'priceUsd',
        title: this.$t('common_ui.currency_columns.priceUsd'),
        type: 'currency',
      },
      {
        id: 'changePercent24Hr',
        title: this.$t('common_ui.currency_columns.changePercent24Hr'),
        type: 'percentage',
      },
      {
        id: 'maxSupply',
        title: this.$t('common_ui.currency_columns.maxSupply'),
        type: 'integer',
      },
      {
        id: 'volumeUsd24Hr',
        title: this.$t('common_ui.currency_columns.volumeUsd24Hr'),
        type: 'currency',
      },
      {
        id: 'vwap24Hr',
        title: this.$t('common_ui.currency_columns.vwap24Hr'),
        type: 'currency',
      }
    ];
    Promise.all([
      this.fetchCryptoList(),
      this.fetchCryptoHistory(this.$route.params.cryptoId),
    ]).then(()=> {
      this.isLoaded = true;
    })
  },
  methods: {
    ...mapActions(cryptoStore, ['fetchCryptoList']),
    ...mapActions(cryptoDetailStore, ['fetchCryptoHistory']),
    replaceByDefault(e) {
      e.target.src = image;
      e.target.title=this.$t('common_ui.image_not_found_title');
    }    
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
    <router-link to="/">{{ $t('dashboard.breadcrumb') }}</router-link> &gt;
    {{ $t('crypto_detail.breadcrumb', {cryptoId: $route.params.cryptoId})  }}
  </div>
  <base-card
    :card-properties="cardProperties"
    :card-content="selectedCrypto"
  >
  <template #title>
    <div class="flex content-center items-center justify-center">
      <img class="w-10 h-10 ml-2 mr-2" :src="selectedCrypto.logo" @error="replaceByDefault"/>
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
    v-if="cryptoHistory.length && isLoaded"
    :graph-labels="cryptoHistory.map((point)=> $d(point.date, 'short'))"
    :graph-data="cryptoHistory.map((point)=> point.priceUsd)"
    :graph-title="$t('crypto_detail.chart_title', {cryptoName: selectedCrypto.name})"
    class="mt-3"
  />
</template>

<style></style>
