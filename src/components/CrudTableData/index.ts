import { App } from 'vue'
import CrudTableData from './CrudTableData'

export default {
  install(app: App) {
    app.component('CrudTableData', CrudTableData)
  }
}
