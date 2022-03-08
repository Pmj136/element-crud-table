import { defineComponent, inject, provide, reactive, toRefs } from 'vue'
import { PJ_DISPATCH_EVENT, PJ_STORE } from '../../token'
import { DispatchEventCallback, PaginationStore } from '../../types'

export default defineComponent({
  name: 'CrudTablePagination',
  props: {
    pageSize: Number
  },
  setup({pageSize = 15}, {expose, slots}) {
    const privateStore = reactive<PaginationStore>({
      currentPage: 1,
      defaultPageSize: pageSize,
      total: 0,
      enablePagination: true
    })
    provide(PJ_STORE, toRefs(privateStore))
    const dispatchEvent = inject<DispatchEventCallback>(PJ_DISPATCH_EVENT)!

    const onPageNoChange = (val: number) => {
      privateStore.currentPage = val
      dispatchEvent('refreshData')
    }
    expose({})
    return () => (
      <>
        { slots.default?.() }
        <div class="crud-table-footer">
          <el-pagination
            background
            layout="total,prev, pager, next"
            current-page={ privateStore.currentPage }
            default-page-size={ privateStore.defaultPageSize }
            total={ privateStore.total }
            onCurrentChange={ onPageNoChange }/>
        </div>
      </>
    )
  }
})
