import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteFonts from 'vite-plugin-fonts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteFonts({
      google: {
        families: ['Nunito', 'Press Start 2P']
      },
    })    
  ],
  define: {
    'process.env.COINCAP_API_KEY': JSON.stringify(process.env.COINCAP_API_KEY),
  }
})
