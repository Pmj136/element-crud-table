import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import App from './UserFormatter.vue'
import ElementCrudTable from '../src'

createApp(App)
    .use(ElementPlus, {locale: zhCn})
    .use(ElementCrudTable)
    .mount('#app')
