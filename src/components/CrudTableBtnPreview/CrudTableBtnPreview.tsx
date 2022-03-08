import { inject, toRaw } from 'vue'
import { PJ_DISPATCH_EVENT, TYPE_PREVIEW } from '../../token'
import { checkCompUsePosition, isDev } from '../../util'
import { CrudTableBtnOpts, DispatchEventCallback } from '../../types'

function CrudTableBtnPreview(props: CrudTableBtnOpts) {
  const {tableData, text = '查看', ...rest} = props
  if (isDev) {
    checkCompUsePosition(!!tableData, 'CrudTableBtnPreview', 'CrudTableHandler')
  }
  const dispatchEvent = inject<DispatchEventCallback>(PJ_DISPATCH_EVENT)!
  return (
    <el-button
      type="text"
      { ...rest }
      onClick={ () => {
        dispatchEvent('showDialog', {
          type: TYPE_PREVIEW,
          title: props.dialogTitle || props['dialog-title'] || '预览',
          echoUrl: props.echoUrl || props['echo-url'],
          extraData: toRaw(tableData!.row)
        })
      } }>
      { text }
    </el-button>
  )
}

export default CrudTableBtnPreview
