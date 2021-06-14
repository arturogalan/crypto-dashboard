<script>
  export default {
    name: 'base-header',

  }
</script>
<template>
<header class="py-5 bg-gray-700 text-white text-center">
  <nav class="flex items-end justify-between mr-7">
    <div
      class="flex items-end cursor-pointer"
      @click="$router.push({name: 'Dashboard'})"
    >
    <h2 class="title-logo ml-10 text-blue-500 whitespace-nowrap">bot-<span class="text-yellow-200">coin</span></h2>
    <span class="ml-3 text-lg whitespace-nowrap">{{ $t('common_ui.header_desc') }}</span>
    </div>
  <div class="cursor-pointer">🌒</div>
  </nav>
</header>
</template>

<style scoped>
  .title-logo {
    font-family: 'Press Start 2P';
    font-weight: bold;
  }
</style>
