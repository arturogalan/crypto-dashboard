import { createApp } from 'vue'
import { pinia } from './store'
import { createI18n } from 'vue-i18n'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import zoomPlugin from 'chartjs-plugin-zoom'

import App from './App.vue'
import './index.css'
import router from "./router/index"

// 1. Ready translated locale messages
// The structure of the locale message is the hierarchical object structure with each locale as the top property
const messages = {
  en: {
    dashboard: {
      breadcrumb: 'Dashboard',
      cypto_listed: '{number} cryptocurrencies listed',
      cypto_listed_and_filtered: '{filteredNumber} cryptocurrencies filtered ({totalNumber} listed)',
      search_placeholder: 'Search a currency',
      search_text: 'Search a currency',
    },
    crypto_detail: {
      breadcrumb: '{cryptoId} detail',
      chart_title: 'Evolution of {cryptoName} price in the ',
    },
    common_ui: {
      header_desc: 'Your cryptocurrencies dashboard !',
      image_not_found_title: 'This cryptocurrency image cannot be found',
      currency_columns: {
        rank: 'Ranking',
        name: 'Currency name',
        symbol: 'Currency symbol',
        priceUsd: 'Last price',
        changePercent24Hr: 'Change % (24h)',
        marketCapUsd: 'Market cap',
        maxSupply: 'Max supply',
        volumeUsd24Hr: 'Volume traded last 24h',
        vwap24Hr: 'Volume Weighted Average Price last 24h',
      },
      date: {
        last_month: 'last month',
        last_week: 'last week',
        last_24h: 'last 24 hours',
      },
      button: {
        last_month: 'Last month',
        last_week: 'Last week',
        last_24h: 'Last 24 hours',
        toggle_locale: 'Toggle locale',
        toggle_real_time: 'Real-time updates'

      },
    },
    message: {
      hello: 'hello world'
    }
  },
  es: {
    dashboard: {
      breadcrumb: 'Página principal',
      cypto_listed: '{number} criptomonedas listadas',
      cypto_listed_and_filtered: '{filteredNumber} criptomonedas filtradas ({totalNumber} listadas)',
      search_placeholder: 'Buscar criptomoneda',
      search_text: 'Buscar criptomoneda',
    },
    crypto_detail: {
      breadcrumb: '{cryptoId} en detalle',
      chart_title: 'Evolución del precio de {cryptoName} en ',
    },
    common_ui: {
      header_desc: 'Tu panel de control de cryptomonedas !',
      image_not_found_title: 'Esta imagen de crytomoneda no se puede mostrar',
      currency_columns: {
        rank: 'Ranking',
        name: 'Nombre',
        symbol: 'Símbolo',
        priceUsd: 'Último precio',
        changePercent24Hr: '% de cambio (últimas 24h)',
        marketCapUsd: 'Capitalización de mercado',
        maxSupply: 'Max supply',
        volumeUsd24Hr: 'Volumen negociado últimas 24h',
        vwap24Hr: 'Precio medio del volumen ponderado últimas 24h',
      }, 
      date: {
        last_month: 'el último mes',
        last_week: 'la última semana',
        last_24h: 'las últimas 24 horas',
      },
      button: {
        last_month: 'Último mes',
        last_week: 'Última semana',
        last_24h: 'Últimas 24 horas',
        toggle_locale: 'Cambiar idioma',
        toggle_real_time: 'Actualizar en tiempo real'
      }
    },
    message: {
      hello: 'hola'
    }
  }
}
const numberFormats = {
  'en': {
    integer: {
      style: 'decimal', useGrouping: true, minimumFractionDigits: 0, maximumFractionDigits: 0,
    },
    decimal: {
      style: 'decimal', useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2,
    },
    decimalNG: {
      style: 'decimal', useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2,
    },
    percentage: {
      style: 'percent', useGrouping: true, minimumFractionDigits: 2 ,
    },
    roundedPercentage: {
      style: 'percent', useGrouping: true, maximumFractionDigits: 0,
    },
    currency: {
      style: 'currency', currency: 'USD', notation: 'standard'
    },
  },
  'es': {
    integer: {
      style: 'decimal', useGrouping: true, minimumFractionDigits: 0, maximumFractionDigits: 0,
    },
    decimal: {
      style: 'decimal', useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2,
    },
    decimalNG: {
      style: 'decimal', useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2,
    },
    percentage: {
      style: 'percent', useGrouping: true, minimumFractionDigits: 2 ,
    },
    roundedPercentage: {
      style: 'percent', useGrouping: true, maximumFractionDigits: 0,
    },
    currency: {
      style: 'currency', currency: 'USD', notation: 'standard'
    },
  },  
};
const datetimeFormats = {
  'en': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric'
    },
    day: {
      weekday: 'short',
      hour: 'numeric',
    }
  },
  es: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    },
    day: {
      weekday: 'short',
      hour: 'numeric',
    }    
  }
}
// 2. Create i18n instance with options
const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'es', // set fallback locale
  messages, // set locale messages
  datetimeFormats,
  numberFormats,
  // If you need to specify other options, you can set other options
  // ...
})

const app = createApp(App).use(pinia).use(router)
app.use(Vue3ChartJs, {
  plugins: [
    zoomPlugin
  ]
})
app.use(i18n)
app.mount('#app')
