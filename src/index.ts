import { App } from 'vue'

import CrudTable from './components/CrudTable/index'
import CrudTableHeader from './components/CrudTableHeader/index'
import CrudTableSearch from './components/CrudTableSearch/index'
import CrudTableAction from './components/CrudTableAction/index'
import CrudTableHandler from './components/CrudTableHandler/index'
import CrudTableData from './components/CrudTableData/index'
import CrudTableDialog from './components/CrudTableDialog/index'
import CrudTableBtnAdd from './components/CrudTableBtnAdd/index'
import CrudTableBtnPreview from './components/CrudTableBtnPreview/index'
import CrudTableBtnEdit from './components/CrudTableBtnEdit/index'
import CrudTableBtnDel from './components/CrudTableBtnDel/index'
import CrudTablePagination from './components/CrudTablePagination/index'


export { default as CrudTable } from './components/CrudTable/index'
export { default as CrudTableHeader } from './components/CrudTableHeader/index'
export { default as CrudTableSearch } from './components/CrudTableSearch/index'
export { default as CrudTableAction } from './components/CrudTableAction/index'
export { default as CrudTableHandler } from './components/CrudTableHandler/index'
export { default as CrudTableData } from './components/CrudTableData/index'
export { default as CrudTableDialog } from './components/CrudTableDialog/index'
export { default as CrudTableBtnAdd } from './components/CrudTableBtnAdd/index'
export { default as CrudTableBtnPreview } from './components/CrudTableBtnPreview/index'
export { default as CrudTableBtnEdit } from './components/CrudTableBtnEdit/index'
export { default as CrudTableBtnDel } from './components/CrudTableBtnDel/index'
export { default as CrudTablePagination } from './components/CrudTablePagination/index'

export default {
  install(app: App, args: { requestMethod: Function }) {
    app.use(CrudTable, args)
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
