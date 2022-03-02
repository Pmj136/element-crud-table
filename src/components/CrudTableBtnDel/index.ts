import { App } from 'vue'
import CrudTableBtnDel from './CrudTableBtnDel'

export default {
  install(app: App) {
    app.component('CrudTableBtnDel', CrudTableBtnDel)
  }
}
