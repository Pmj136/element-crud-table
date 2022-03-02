import { defineComponent, provide, reactive, toRefs } from 'vue'
import { ACTION__SET_LIST } from '../../token'
import { PaginationStore } from '../../types'
import { useDispatchAction } from '../../hooks'

export default defineComponent({
  name: 'CrudTablePagination',
  props: {
    pageSize: Number
  },
  setup({pageSize = 15}, {expose, slots}) {
    const setList = useDispatchAction(ACTION__SET_LIST)
    const store = reactive<PaginationStore>({
      currentPage: 1,
      defaultPageSize: pageSize,
      total: 0,
      enablePagination: true
    })
    provide('store', toRefs(store))

    const onPageNoChange = (val: number) => {
      store.currentPage = val
      setList()
    }
    expose({})
    return () => (
      <>
        { slots.default?.() }
        <div class="crud-table-footer">
          <el-pagination
            background
            layout="total,prev, pager, next"
            current-page={ store.currentPage }
            default-page-size={ store.defaultPageSize }
            total={ store.total }
            onCurrentChange={ onPageNoChange }/>
        </div>
      </>
    )
  }
})
