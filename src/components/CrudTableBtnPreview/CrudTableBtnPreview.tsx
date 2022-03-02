import { toRaw } from 'vue'
import { ACTION__SHOW_DIALOG, TYPE_PREVIEW } from '../../token'
import { checkCompUsePosition, isDev } from '../../util'
import { CrudTableBtnOpts } from '../../types'
import { useDispatchAction } from '../../hooks'

function CrudTableBtnPreview(props: CrudTableBtnOpts) {
  const {tableData, text = '查看', dialogTitle = '预览', ...rest} = props
  if (isDev) {
    checkCompUsePosition(!!tableData, 'CrudTableBtnPreview', 'CrudTableHandler')
  }
  const showDialog = useDispatchAction(ACTION__SHOW_DIALOG, {
    type: TYPE_PREVIEW,
    title: dialogTitle,
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

export default CrudTableBtnPreview
