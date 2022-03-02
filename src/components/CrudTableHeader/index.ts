import { App } from 'vue'
import CrudTableHeader from './CrudTableHeader'

export default {
  install(app: App) {
    app.component('CrudTableHeader', CrudTableHeader)
  }
}
