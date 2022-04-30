import { App } from 'vue'
import CrudTableBtnDel from './CrudTableBtnDel.vue'

export default {
  install(app: App) {
    app.component('CrudTableBtnDel', CrudTableBtnDel)
  }
}
