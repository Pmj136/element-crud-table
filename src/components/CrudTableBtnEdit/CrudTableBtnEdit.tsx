import { toRaw } from 'vue'
import { ACTION__SHOW_DIALOG, TYPE_EDIT } from '../../token'
import { checkCompUsePosition, isDev } from '../../util'
import { CrudTableBtnOpts } from '../../types'
import { useDispatchAction } from '../../hooks'

function CrudTableBtnEdit(props: CrudTableBtnOpts) {
  const {tableData, url, dialogTitle = '编辑', text = '编辑', ...rest} = props
  if (isDev) {
    checkCompUsePosition(!!tableData, 'CrudTableBtnEdit', 'CrudTableHandler')
  }
  const showDialog = useDispatchAction(ACTION__SHOW_DIALOG, {
    type: TYPE_EDIT,
    title: dialogTitle,
    url,
    extraData: toRaw(tableData!.row)
  })
  return (
    <el-button
      type="text"
      { ...rest }
      onClick={ showDialog }>
      { text }
    </el-button>
  )
}

export default CrudTableBtnEdit
