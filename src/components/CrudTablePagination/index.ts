import { App } from 'vue'
import CrudTablePagination from './CrudTablePagination'

export default {
  install(app: App) {
    app.component('CrudTablePagination', CrudTablePagination)
  }
}
