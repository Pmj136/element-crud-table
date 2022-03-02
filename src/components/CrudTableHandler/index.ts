import { App } from 'vue'
import CrudTableHandler from "./CrudTableHandler";

export default {
  install(app:App) {
    app.component("CrudTableHandler", CrudTableHandler)
  }
}
