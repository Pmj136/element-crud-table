import { App } from 'vue'
import CrudTableBtnPreview from './CrudTableBtnPreview'

export default {
  install(app: App) {
    app.component('CrudTableBtnPreview', CrudTableBtnPreview)
  }
}
