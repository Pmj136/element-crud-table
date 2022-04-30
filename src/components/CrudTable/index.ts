import { App } from 'vue'
import CrudTable from './CrudTable.vue'
import { PJ_REQUEST_METHOD } from '../../token'
import { _request } from '../../util'

export default {
  install(app: App, {requestMethod = _request} = {}) {
    app.provide(PJ_REQUEST_METHOD, requestMethod)
    app.component('CrudTable', CrudTable)
  }
}
