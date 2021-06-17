<script>
  import BaseHeader from './components/BaseHeader.vue'
  import BaseFooter from './components/BaseFooter.vue'

  export default {
    components: {
      BaseHeader,
      BaseFooter,
    },
  }
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>
<template>
<div class="flex flex-col h-screen bg-white dark:bg-gray-400">
  <base-header/>
  <main class="flex-1 overflow-y-auto p-1 md:p-5">
    <router-view/>
    <base-footer/>
  </main>
</div>
</template>


<style>
#app {
  font-family: Nunito, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
root {
  backgroun-color: var(--color-bg-default);
}
</style>
