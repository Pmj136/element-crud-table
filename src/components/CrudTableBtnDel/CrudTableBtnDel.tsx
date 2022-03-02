import { inject } from 'vue'
import {
  checkCompUsePosition,
  checkUnSetUrlErrLog,
  combineUrl,
  func_ask_for,
  isDev
} from '../../util'
import { ACTION__SET_LIST, CRUD_TABLE_REQUEST_METHOD } from '../../token'
import { CrudTableBtnOpts } from '../../types'
import { useDispatchAction } from '../../hooks'

function CrudTableBtnDel(props: CrudTableBtnOpts) {
  const {tableData, url, text = '删除', ...rest} = props
  if (isDev)
    checkCompUsePosition(!!tableData, 'CrudTableBtnDel', 'CrudTableHandler')

  const setList = useDispatchAction(ACTION__SET_LIST)
  const request = inject<Function>(CRUD_TABLE_REQUEST_METHOD)
  const handleDel = () => {
    if (isDev) checkUnSetUrlErrLog('del', url)
    func_ask_for({
      url: combineUrl(url!, tableData!.row.id),
      successTip: '删除成功'
    }, request!).then(setList)
  }
  return (
    <el-button
      type="text"
      style={ {color: '#e06161'} }
      { ...rest }
      onClick={ handleDel }>
      { text }
    </el-button>
  )
}

export default CrudTableBtnDel
