import CrudTable from "./CrudTable";
import {CRUD_TABLE_REQUEST_METHOD} from "../../token";
import {_request} from "../../util";

export default {
  install(app, {requestMethod = _request, headers} = {}) {
    let req = requestMethod
    if (headers) req = (args) => requestMethod({headers, ...args})
    app.provide(CRUD_TABLE_REQUEST_METHOD, req)
    app.component("CrudTable", CrudTable)
  }
}
