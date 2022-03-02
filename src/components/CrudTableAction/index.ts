import { App } from 'vue'
import CrudTableAction from './CrudTableAction'


export default {
  install(app: App) {
    app.component('CrudTableAction', CrudTableAction)
  }
}
