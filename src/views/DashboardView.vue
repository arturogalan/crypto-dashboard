<script>
import { defineProps, reactive } from 'vue'
import { cryptoStore } from '../store/crypto'
import { mapActions, mapState } from 'pinia'
import BaseTable from '../components/BaseTable.vue'

export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      columns: [
        {
          id: 'rank',
          title: 'Ranking',
        },
        {
          id: 'name',
          title: 'Coin name',
        },
        {
          id: 'symbol',
          title: 'Coin symbol',
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
    }
  },
  computed: {
    ...mapState(cryptoStore, ['sortedCryptoList']),
  },
}
</script>

<template>

  <h2>{{ $t('dashboard.cypto_listed', {number: sortedCryptoList.length}) }}</h2>
  <div class="flex">
  <base-table
    :columns="columns"
    :rows="sortedCryptoList"
    class="mx-8 flex-auto mb-4"
    @click="goToRowDetail"
  >
    <template #name="{row}">
      <div class="flex">
        <img class="w-5 h-5 ml-2 mr-2" :src="row.logo" />
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
