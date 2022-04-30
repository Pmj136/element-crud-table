import { App } from 'vue'
import CrudTableAction from './CrudTableAction.vue'


export default {
  install(app: App) {
    app.component('CrudTableAction', CrudTableAction)
  }
}
