import { inject } from 'vue'
import { PJ_DISPATCH_EVENT, TYPE_EDIT } from '../../token'
import { checkCompUsePosition, isDev } from '../../util'
import { CrudTableBtnOpts, DispatchEventCallback } from '../../types'

function CrudTableBtnEdit(props: CrudTableBtnOpts) {
  const {tableData, url, text = '编辑', ...rest} = props
  if (isDev) {
    checkCompUsePosition(!!tableData, 'CrudTableBtnEdit', 'CrudTableHandler')
  }
  const dispatchEvent = inject<DispatchEventCallback>(PJ_DISPATCH_EVENT)!
  return (
    <el-button
      type="text"
      { ...rest }
      onClick={ () => {
        dispatchEvent("showDialog", {
          type: TYPE_EDIT,
          title: props.dialogTitle || props['dialog-title'] || '编辑',
          url,
          echoUrl: props.echoUrl || props['echo-url'],
          extraData: tableData!.row
        })
      } }>
      { text }
    </el-button>
  )
}

export default CrudTableBtnEdit
