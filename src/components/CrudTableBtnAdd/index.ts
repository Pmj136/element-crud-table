import { App } from 'vue'
import CrudTableBtnAdd from './CrudTableBtnAdd.vue'

export default {
  install(app: App) {
    app.component('CrudTableBtnAdd', CrudTableBtnAdd)
  }
}
