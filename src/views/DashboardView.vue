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
      columns: [],
      searchCurrencyText: '',
      sorting: {
        field: 'rank',
        direction: 'asc',
      }
    }
  },
  mounted() {
    this.fetchCryptoList();
    this.columns = [
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
    ];
  },
  methods: {
    ...mapActions(cryptoStore, ['fetchCryptoList', 'setCryptoListSorting']),
    goToRowDetail({row, column}) {
      this.$router.push({name: 'CurrencyDetail', params: {cryptoId: row.id}});
    },
    replaceByDefault(e) {
      e.target.src = image;
      e.target.title=this.$t('common_ui.image_not_found_title');
    },
    sortColumn(column) {
      if (this.sorting.field === column.id) {
        this.sorting.direction = this.sorting.direction === 'asc' ? 'desc' : 'asc'
      } else {
        this.sorting.direction = 'asc';
      }
      this.sorting.field = column.id;
      this.setCryptoListSorting(this.sorting);
    }
  },
  computed: {
    ...mapState(cryptoStore, ['sortedCryptoList']),
    filteredCryptoList() {
      return this.sortedCryptoList.filter((el)=> {
        const isFiltering = !!this.searchCurrencyText;
        return !isFiltering || el.name.toLowerCase().includes(this.searchCurrencyText.toLowerCase())
      })
    },
    cyptoListedText() {
      if (this.sortedCryptoList.length === this.filteredCryptoList.length) {
        return this.$t('dashboard.cypto_listed', {number: this.sortedCryptoList.length})
      } else {
        return this.$t('dashboard.cypto_listed_and_filtered', {filteredNumber: this.filteredCryptoList.length, totalNumber: this.sortedCryptoList.length})
      }
    }
  },
  watch: {
  },
}
</script>

<template>
  <div class="flex content-between justify-between mb-5">
    <div  class="w-auto text-left ml-8">
      {{ cyptoListedText }}
    </div>
    <div>
      <input
        type="text"
        :placeholder="$t('dashboard.search_placeholder')"
        v-model="searchCurrencyText"
        class="box-border border-black"
      >
    </div>
  </div>
  <div class="flex">
  <base-table
    :columns="columns"
    :rows="filteredCryptoList"
    :sorting="sorting"
    class="mx-8 flex-auto mb-4"
    @click="goToRowDetail"
    @sortColumn="sortColumn"
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
