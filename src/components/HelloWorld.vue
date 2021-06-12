<template>
  <!-- <h1>{{ msg }}</h1> -->

  <p>
    {{ cryptoVariants.length }}
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      {{ crypto.name }}

      <!-- {{ crypto.cryptoList.lenght }} -->
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <!-- <button type="button" @click="state.count++">count is: {{ state.count }}</button> -->
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
import { defineProps, reactive } from 'vue'
import { cryptoStore } from '../store/crypto'
import { mapActions, mapState } from 'pinia'

export default {
  data() {
    return {
      crypto: {
        cryptoList: [],
      },
    }
  },
  mounted () {
    this.fetchCryptoVariants();
  },
  methods: {
    ...mapActions(cryptoStore, ['fetchCryptoVariants']),
  },
  computed: {
    ...mapState(cryptoStore, ['cryptoList', 'cryptoVariants'])
  },
}

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
