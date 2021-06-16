<script>
  import ThemeSwitcher from '../components/ThemeSwitcher.vue'
  import LocaleSwitcher from '../components/LocaleSwitcher.vue'

  export default {
    name: 'base-header',
    components: {
      ThemeSwitcher,
      LocaleSwitcher,
    },
  }
</script>
<template>
<header class="py-5 bg-gray-700 text-white text-center">
  <nav class="flex items-end justify-between mr-7">
    <div
      class="flex items-end cursor-pointer"
      @click="$router.push({name: 'Dashboard'})"
    >
    <img class="w-12 h-12 ml-3 rounded opacity-60" src="../assets/bot-coin.png"/>

    <h2 class="title-logo ml-3 text-blue-500 whitespace-nowrap">bot-<span class="text-yellow-200">coin</span></h2>
    <span class="ml-3 text-lg whitespace-nowrap">{{ $t('common_ui.header_desc') }}</span>
    </div>
    <div class="flex">
    <locale-switcher class="mr-3"/>
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
