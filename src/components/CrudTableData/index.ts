import { App } from 'vue'
import CrudTableData from './CrudTableData.vue'

export default {
  install(app: App) {
    app.component('CrudTableData', CrudTableData)
  }
}
