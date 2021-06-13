import { createApp } from 'vue'
import { pinia } from './store'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import './index.css'
import router from "./router/index"

// 1. Ready translated locale messages
// The structure of the locale message is the hierarchical object structure with each locale as the top property
const messages = {
  en: {
    dashboard: {
      cypto_listed: '{number} cryptocurrencies listed'
    },
    message: {
      hello: 'hello world'
    }
  },
  es: {
    dashboard: {
      cypto_listed: '{number} cryptomonedas listadas'
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
};
const dateTimeFormats = {
  'en': {
    short: {
      year: 'numeric', month: '2-digit', day: '2-digit',
    },
    month: {
      year: 'numeric', month: 'short',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    },
    day: {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    },
    year: {
      year: 'numeric',
    },
  },
  'en-ca': {
    short: {
      year: 'numeric', month: '2-digit', day: '2-digit',
    },
  },
};
// 2. Create i18n instance with options
const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'es', // set fallback locale
  messages, // set locale messages
  numberFormats,
  dateTimeFormats,
  // If you need to specify other options, you can set other options
  // ...
})

const app = createApp(App).use(pinia).use(router)
app.use(i18n)

app.mount('#app')
