import { App } from 'vue'
import CrudTableBtnEdit from './CrudTableBtnEdit'

export default {
  install(app: App) {
    app.component('CrudTableBtnEdit', CrudTableBtnEdit)
  }
}
