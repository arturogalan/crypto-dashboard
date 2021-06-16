<script>
import { cryptoStore } from '../store/crypto'
import { cryptoDetailStore } from '../store/cryptoDetail'

import { mapActions, mapState } from 'pinia'
import BaseCard from '../components/BaseCard.vue'
import BaseChart from '../components/BaseChart.vue'
import image from '../assets/image-not-found.png'

import {cryptoHistoryIntervals} from '../utils/baseConstants'

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
      cryptoHistoryIntervals: cryptoHistoryIntervals,
      selectedInterval: cryptoHistoryIntervals.MONTH,
    }
  },
  mounted() {
    this.cardProperties = [
      {
        id: 'marketCapUsd',
        title: 'common_ui.currency_columns.marketCapUsd',
        type: 'currency',
      },
      {
        id: 'priceUsd',
        title: 'common_ui.currency_columns.priceUsd',
        type: 'currency',
      },
      {
        id: 'changePercent24Hr',
        title: 'common_ui.currency_columns.changePercent24Hr',
        type: 'percentage',
      },
      {
        id: 'maxSupply',
        title: 'common_ui.currency_columns.maxSupply',
        type: 'integer',
      },
      {
        id: 'volumeUsd24Hr',
        title: 'common_ui.currency_columns.volumeUsd24Hr',
        type: 'currency',
      },
      {
        id: 'vwap24Hr',
        title: 'common_ui.currency_columns.vwap24Hr',
        type: 'currency',
      }
    ];
    Promise.all([
      this.fetchCryptoList(),
      this.fetchCryptoHistory({currencyId: this.$route.params.cryptoId, selectedInterval: this.selectedInterval}),
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
    },
    updateChart(selectedInterval) {
      this.isLoaded = false;
      this.selectedInterval = selectedInterval;
      this.fetchCryptoHistory({currencyId: this.$route.params.cryptoId, selectedInterval: this.selectedInterval}).then(()=> {
        this.isLoaded = true;
      })
    },
    labelsFormat(date) {
      // depending on the selected interval, we format de x axis dates
      return {
        [cryptoHistoryIntervals.DAY]: (date)=> this.$d(date, 'day'),
        [cryptoHistoryIntervals.WEEK]: (date)=> this.$d(date, 'short'),
        [cryptoHistoryIntervals.MONTH]: (date)=> this.$d(date, 'short'),
      }[this.selectedInterval](date)
    },
    isSelected(interval) {
      return interval === this.selectedInterval;
    },
  },  
  computed: {
    ...mapState(cryptoStore, ['cryptoProperties']),
    ...mapState(cryptoDetailStore, ['cryptoHistory']),
    selectedCrypto() {
      return this.cryptoProperties(this.$route.params.cryptoId) || {};
    },
    graphTitle() {
      const intervalKey = {
        [cryptoHistoryIntervals.DAY]: 'last_24h',
        [cryptoHistoryIntervals.WEEK]: 'last_week',
        [cryptoHistoryIntervals.MONTH]: 'last_month',
      }[this.selectedInterval]
      return this.$t('crypto_detail.chart_title', {cryptoName: this.selectedCrypto.name})
      + this.$t(`common_ui.date.${intervalKey}`, {cryptoName: this.selectedCrypto.name})
    }
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
  <div class="min-h-screen">
    <div class="mt-2">
      <button
        class="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        :class="isSelected(cryptoHistoryIntervals.DAY) ? 'bg-blue-500' : 'bg-blue-300'"
        @click="updateChart(cryptoHistoryIntervals.DAY)"
        >
          {{ $t('common_ui.button.last_24h') }}
        </button>
      <button
        class="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 mr-2"
        :class="isSelected(cryptoHistoryIntervals.WEEK) ? 'bg-blue-500' : 'bg-blue-300'"
        @click="updateChart(cryptoHistoryIntervals.WEEK)">
          {{ $t('common_ui.button.last_week') }}
        </button>
      <button
        class="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        :class="isSelected(cryptoHistoryIntervals.MONTH) ? 'bg-blue-500' : 'bg-blue-300'"
        @click="updateChart(cryptoHistoryIntervals.MONTH)"
      >
        {{ $t('common_ui.button.last_month') }}
      </button>
    </div>
  <base-chart
    v-if="cryptoHistory.length && isLoaded"
    :graph-labels="cryptoHistory.map((point)=> labelsFormat(point.date))"
    :graph-data="cryptoHistory.map((point)=> point.priceUsd)"
    :graph-title="graphTitle"
    class="mt-3"
  />
  </div>
</template>

<style></style>
