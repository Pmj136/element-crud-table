import { defineComponent, inject, ref, ToRefs } from 'vue'
import { ACTION__SET_LIST, CRUD_TABLE_REQUEST_METHOD } from '../../token'
import { checkUnSetUrlErrLog, isDev } from '../../util'
import { PaginationStore } from '../../types'


export default defineComponent({
  name: 'CrudTableData',
  props: {
    url: String,
    autoLoad: {
      type: Boolean,
      default: true
    }
  },
  setup({url, autoLoad}, {slots}) {
    if (isDev) {
      checkUnSetUrlErrLog('list', url)
    }
    const {
      currentPage,
      defaultPageSize,
      total,
      enablePagination
    } = inject<Partial<ToRefs<PaginationStore>>>('store', {})
    const request = inject<Function>(CRUD_TABLE_REQUEST_METHOD)
    const isLoading = ref(false)
    const tableData = ref([])
    const setList = async (params?: object) => {
      isLoading.value = true
      try {
        const res = await request!({
          url,
          method: 'get',
          params: Object.assign({
            pageNo: currentPage?.value,
            pageSize: defaultPageSize?.value
          }, params || {})
        })
        if (enablePagination) {
          const {records, total: resTotal} = res.data
          if (isDev) {
            if (!records || !resTotal) {
              console.error('接口响应数据格式不合法')
              return
            }
          }
          tableData.value = records
          total!.value = resTotal
        }
        else {
          tableData.value = res.data
        }
      } finally {
        isLoading.value = false
      }
    }
    const on = inject<Function>('on')
    on!(ACTION__SET_LIST, setList)
    if (autoLoad) setList()

    return () => (
      <el-table
        v-loading={ isLoading.value }
        border
        stripe
        height="100%"
        data={ tableData.value }
        v-slots={ {
          empty: () => (
            isLoading.value ? <span/>
              : (
                <el-empty>
                  <el-button type="primary" onClick={ setList }>刷新</el-button>
                </el-empty>
              )
          )
        } }>
        { slots.default?.() }
      </el-table>
    )
  }
})
