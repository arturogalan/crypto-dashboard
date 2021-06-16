<script>
export default {
  name: 'locale-switcher',
  data() {
    return {
    }
  },
  mounted () {
    this.toggleTheme();
  },
  methods: {
    toggleTheme () {
      localStorage.theme === 'dark' ? localStorage.theme = 'light' : localStorage.theme = 'dark';
      // On page load or when changing themes, best to add inline in `head` to avoid FOUC
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        this.theme = 'dark';
      } else {
        document.documentElement.classList.remove('dark')
        this.theme = 'light';
      }      
    }
  }
}
</script>
<template>
  <div
    href="#"
    class="text-xl cursor-pointer"
    title="Toggle locale"
    aria-label="Toggle locale"
    
  >
    <span @click.prevent="$i18n.locale = 'en'" v-if="$i18n.locale === 'es'">🇪🇸</span> 
    <span @click.prevent="$i18n.locale = 'es'" v-else>🇺🇸</span> 
  </div>
</template>


