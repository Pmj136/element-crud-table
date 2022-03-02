import { App } from 'vue'
import CrudTableSearch from './CrudTableSearch'

export default {
  install(app: App<Element>) {
    app.component('CrudTableSearch', CrudTableSearch)
  }
}
