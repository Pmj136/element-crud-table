import { App } from 'vue'
import CrudTablePagination from './CrudTablePagination.vue'

export default {
  install(app: App) {
    app.component('CrudTablePagination', CrudTablePagination)
  }
}
