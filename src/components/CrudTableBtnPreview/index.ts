import { App } from 'vue'
import CrudTableBtnPreview from './CrudTableBtnPreview.vue'

export default {
  install(app: App) {
    app.component('CrudTableBtnPreview', CrudTableBtnPreview)
  }
}
