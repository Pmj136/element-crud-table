import { Plus } from '@element-plus/icons-vue'
import { ACTION__SHOW_DIALOG, TYPE_ADD } from '../../token'
import { CrudTableBtnOpts } from '../../types'
import { useDispatchAction } from '../../hooks'


function CrudTableBtnAdd(props: CrudTableBtnOpts) {
  const {text = '新增', dialogTitle = '新增', url, ...rest} = props
  const showDialog = useDispatchAction(ACTION__SHOW_DIALOG, {
    type: TYPE_ADD,
    title: dialogTitle,
    url
  })
  return (
    <el-button
      icon={ Plus }
      type="primary"
      { ...rest }
      onClick={ showDialog }>
      { text }
    </el-button>
  )
}

export default CrudTableBtnAdd
