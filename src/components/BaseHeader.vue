<script>
  import ThemeSwitcher from '../components/ThemeSwitcher.vue'
  import LocaleSwitcher from '../components/LocaleSwitcher.vue'
  import BaseSwitch from '../components/BaseSwitch.vue'
  import { mapActions } from 'pinia'
  import { cryptoStore } from '../store/crypto'

  export default {
    name: 'base-header',
    components: {
      ThemeSwitcher,
      LocaleSwitcher,
      BaseSwitch,
    },
    data() {
      return {
        isRealTimeActive: false,
      }
    },
    mounted () {
      this.toggleRealTime();
    },
    methods: {
    ...mapActions(cryptoStore, ['startPeriodicFetchCryptoList', 'cancelPeriodicFetchCryptoList']),

      toggleRealTime() {
        this.isRealTimeActive = !this.isRealTimeActive;
        if (this.isRealTimeActive) {
          this.startPeriodicFetchCryptoList()
        } else {
          this.cancelPeriodicFetchCryptoList()
        }
      }
    },
  }
</script>
<template>
<header class="py-5 bg-gray-700 text-white text-center">
  <nav class="md:flex md:items-center md:justify-between">
    <div
      class="lg:flex lg:justify-between justify-center items-end cursor-pointer"
      @click="$router.push({name: 'Dashboard'})"
    >
      <div class="flex items-end justify-center">
        <img class="w-12 h-12 ml-3 rounded opacity-60" src="../assets/bot-coin.png"/>
        <h2 class="title-logo ml-3 text-blue-500 whitespace-nowrap">bot-<span class="text-yellow-200">coin</span></h2>
      </div>
      <span class="ml-3 text-sm whitespace-nowrap">{{ $t('common_ui.header_desc') }}</span>
    </div>
    <div class="flex justify-items-center content-center mr-2 mt-2 pt-3 md:pt-0 border-gray-50 border-dashed border-t-2 md:border-none">
      <base-switch
        :label="$t('common_ui.button.toggle_real_time')"
        @click="toggleRealTime()"
      />
      <locale-switcher class="mr-3 ml-3"/>
      <theme-switcher />
    </div>
  </nav>
</header>
</template>

<style scoped>
  .title-logo {
    font-family: 'Press Start 2P';
    font-weight: bold;
  }
</style>
