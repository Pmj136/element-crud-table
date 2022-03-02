import { App } from 'vue'
import CrudTableDialog from './CrudTableDialog'

export default {
  install(app: App) {
    app.component('CrudTableDialog', CrudTableDialog)
  }
}
