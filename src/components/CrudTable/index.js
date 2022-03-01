import CrudTable from "./CrudTable";
import {CRUD_TABLE_REQUEST_METHOD} from "../../token";
import {_request} from "../../util";

export default {
  install(app, {requestMethod = _request} = {}) {
    app.provide(CRUD_TABLE_REQUEST_METHOD, requestMethod)
    app.component("CrudTable", CrudTable)
  }
}
