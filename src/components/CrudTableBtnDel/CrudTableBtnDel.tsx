import { inject } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { checkCompUsePosition, checkUnSetUrlErrLog, combineUrl, isDev } from '../../util'
import { CrudTableBtnOpts, DispatchEventCallback } from '../../types'
import { PJ_DISPATCH_EVENT, PJ_REQUEST_METHOD } from '../../token'


function CrudTableBtnDel(props: CrudTableBtnOpts) {
  const {tableData, url, text = '删除', ...rest} = props
  if (isDev)
    checkCompUsePosition(!!tableData, 'CrudTableBtnDel', 'CrudTableHandler')

  const dispatchEvent = inject<DispatchEventCallback>(PJ_DISPATCH_EVENT)!
  const request = inject<Function>(PJ_REQUEST_METHOD)!
  const handleDel = () => {
    if (isDev) {
      checkUnSetUrlErrLog('del', url)
    }
    ElMessageBox
      .confirm('此操作将永久删除该记录, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        draggable: true,
        roundButton: true,
        beforeClose: async (action, instance, done) => {
          if (action === 'cancel') {
            done()
          }
          else {
            try {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '正在删除'
              const res = await request({
                url: combineUrl(url!, tableData!.row.id),
                method: 'delete'
              })
              ElMessage.success(res.msg || '删除成功')
              done()
            } catch (e) {
              instance.confirmButtonText = '重试'
              console.log(e)
            } finally {
              instance.confirmButtonLoading = false
            }
          }
        }
      })
      .then(() => {
        dispatchEvent('refreshData')
      })
      .catch(e => e)
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
