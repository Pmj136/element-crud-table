import { App } from 'vue'
import CrudTableHeader from './CrudTableHeader.vue'

export default {
  install(app: App) {
    app.component('CrudTableHeader', CrudTableHeader)
  }
}
