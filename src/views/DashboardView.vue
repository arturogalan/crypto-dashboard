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
          id: 'name',
          title: 'name',
        },
        {
          id: 'symbol',
          title: 'symbol',
        },
        {
          id: 'rank',
          title: 'rank',
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
  <h2>{{ sortedCryptoList.length }} cryptocurrencies listed: </h2>
  <div class="flex">
  <base-table
    :columns="columns"
    :rows="sortedCryptoList"
    class="mx-8 flex-auto mb-4"
    @click="goToRowDetail"
  />
  </div>
</template>

<style scoped>
</style>
