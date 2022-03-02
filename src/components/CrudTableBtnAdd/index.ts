import { App } from 'vue'
import CrudTableBtnAdd from './CrudTableBtnAdd'

export default {
  install(app: App) {
    app.component('CrudTableBtnAdd', CrudTableBtnAdd)
  }
}
