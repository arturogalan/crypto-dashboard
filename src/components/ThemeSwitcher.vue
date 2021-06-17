<script>
export default {
  name: 'theme-switcher',
  data() {
    return {
      theme: '',
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
    class="text-xl cursor-pointer flex items-center"
    title="Toggle theme between light and dark"
    aria-label="Toggle theme between light and dark"
    @click.prevent="toggleTheme"
  >
    <span v-if="theme === 'light'">🔆</span> 
    <span v-else>🌛 </span> 
  </div>
</template>
