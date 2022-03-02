import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import App from './App.vue'
import ElementCrudTable from '../src'
import '../dist/style.css'
import request from './request'

createApp(App)
  .use(ElementPlus, {locale: zhCn})
  .use(ElementCrudTable, {requestMethod:request})
  .mount('#app')
