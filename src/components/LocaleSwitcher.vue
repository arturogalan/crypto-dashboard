<script>
export default {
  name: 'locale-switcher',
  data() {
    return {
      appLocale: this.$i18n.locale,
    }
  },
  computed: {
  },
  methods: {
    changeLocale(selectedLocale) {
      this.appLocale = selectedLocale;
      this.$i18n.locale = selectedLocale;
    }
  },
}
</script>
<template>
  <div
    href="#"
    class="text-xl cursor-pointer"
    :title="$t('common_ui.button.toggle_locale')"
    aria-label="Toggle locale"
    
  >
    <span @click.prevent="changeLocale('es')" v-if="appLocale === 'en'">🇪🇸</span> 
    <span @click.prevent="changeLocale('en')" v-else>🇺🇸</span> 
  </div>
</template>


