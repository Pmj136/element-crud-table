import { App } from 'vue'
import CrudTableBtnEdit from './CrudTableBtnEdit.vue'

export default {
  install(app: App) {
    app.component('CrudTableBtnEdit', CrudTableBtnEdit)
  }
}
