import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
  ],
  build: {
    lib: {
      entry: './src/index.js',
      formats: ['es', 'umd'],
      name: "ElementTablePlus",
      fileName: "index"
    },
    rollupOptions: {
      external: ['vue', 'element-plus', '@element-plus/icons-vue']
    },
    terserOptions: {
      compress: true,
      output: {
        comments: false
      }
    }
  }
})
