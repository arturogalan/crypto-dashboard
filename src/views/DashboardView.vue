<script>
import { defineProps, reactive } from 'vue'
import { cryptoStore } from '../store/crypto'
import { mapActions, mapState } from 'pinia'
import BaseTable from '../components/BaseTable.vue'
import image from '../assets/image-not-found.png'

 
export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      columns: [
        {
          id: 'rank',
          title: this.$t('common_ui.currency_columns.rank'),
          type: 'string',
        },
        {
          id: 'name',
          title: this.$t('common_ui.currency_columns.name'),
          type: 'string',
        },
        {
          id: 'symbol',
          title: this.$t('common_ui.currency_columns.symbol'),
          type: 'string',
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
      ],
    }
  },
  mounted() {
    this.fetchCryptoList()
  },
  methods: {
    ...mapActions(cryptoStore, ['fetchCryptoList']),
    goToRowDetail({row, column}) {
      this.$router.push({name: 'CurrencyDetail', params: {cryptoId: row.id}});
    },
    replaceByDefault(e) {
      e.target.src = image;
      e.target.title=this.$t('common_ui.image_not_found_title');
    }
  },
  computed: {
    ...mapState(cryptoStore, ['sortedCryptoList']),
  },
}
</script>

<template>

  <div class="w-auto text-left ml-8">{{ $t('dashboard.cypto_listed', {number: sortedCryptoList.length}) }}</div>
  <div class="flex">
  <base-table
    :columns="columns"
    :rows="sortedCryptoList"
    class="mx-8 flex-auto mb-4"
    @click="goToRowDetail"
  >
    <!-- In case of 'name' column, overwrite the column to add the logo together with the name -->
    <template #name="{row}">
      <div class="flex">
        <img class="w-5 h-5 ml-2 mr-2" :src="row.logo" @error="replaceByDefault"/>
        <div>
          {{ row.name }}
        </div>
      </div>
    </template>
  </base-table>
  </div>
</template>

<style scoped>
</style>
