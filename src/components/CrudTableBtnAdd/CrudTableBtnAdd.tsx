import { inject } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { PJ_DISPATCH_EVENT, TYPE_ADD } from '../../token'
import { CrudTableBtnOpts, DispatchEventCallback } from '../../types'


function CrudTableBtnAdd(props: CrudTableBtnOpts) {
  const {text = '新增', url, ...rest} = props
  const dispatchEvent = inject<DispatchEventCallback>(PJ_DISPATCH_EVENT)!
  return (
    <el-button
      icon={ Plus }
      type="primary"
      { ...rest }
      onClick={ () => {
        dispatchEvent("showDialog", {
          type: TYPE_ADD,
          title: props.dialogTitle || props['dialog-title'] || '新增',
          url
        })
      } }>
      { text }
    </el-button>
  )
}

export default CrudTableBtnAdd
