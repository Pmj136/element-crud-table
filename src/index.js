import CrudTable from "./components/CrudTable"
import CrudTableHeader from "./components/CrudTableHeader"
import CrudTableSearch from "./components/CrudTableSearch"
import CrudTableAction from "./components/CrudTableAction"
import CrudTableHandler from "./components/CrudTableHandler"
import CrudTableData from "./components/CrudTableData"
import CrudTableDialog from "./components/CrudTableDialog"
import CrudTableBtnAdd from "./components/CrudTableBtnAdd"
import CrudTableBtnPreview from "./components/CrudTableBtnPreview"
import CrudTableBtnEdit from "./components/CrudTableBtnEdit"
import CrudTableBtnDel from "./components/CrudTableBtnDel"
import CrudTablePagination from "./components/CrudTablePagination"

export {default as CrudTable} from './components/CrudTable'
export {default as CrudTableHeader} from './components/CrudTableHeader'
export {default as CrudTableSearch} from './components/CrudTableSearch'
export {default as CrudTableAction} from './components/CrudTableAction'
export {default as CrudTableHandler} from './components/CrudTableHandler'
export {default as CrudTableData} from './components/CrudTableData'
export {default as CrudTableDialog} from './components/CrudTableDialog'
export {default as CrudTableBtnAdd} from './components/CrudTableBtnAdd'
export {default as CrudTableBtnPreview} from './components/CrudTableBtnPreview'
export {default as CrudTableBtnEdit} from './components/CrudTableBtnEdit'
export {default as CrudTableBtnDel} from './components/CrudTableBtnDel'
export {default as CrudTablePagination} from './components/CrudTablePagination'
export default {
  install(app, opt) {
    app.use(CrudTable, opt)
    app.use(CrudTableHeader)
    app.use(CrudTableSearch)
    app.use(CrudTableAction)
    app.use(CrudTableHandler)
    app.use(CrudTableData)
    app.use(CrudTableDialog)
    app.use(CrudTableBtnAdd)
    app.use(CrudTableBtnPreview)
    app.use(CrudTableBtnEdit)
    app.use(CrudTableBtnDel)
    app.use(CrudTablePagination)
  }
}
