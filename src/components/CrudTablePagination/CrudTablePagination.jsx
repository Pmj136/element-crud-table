import {defineComponent, inject, provide, reactive, toRefs} from "vue";
import {ACTION__SET_LIST} from "../../token";

export default defineComponent({
  name: "CrudTablePagination",
  props: {
    pageSize: Number
  },
  setup({pageSize = 15}, {expose, slots}) {
    const store = reactive({
      currentPage: 1,
      defaultPageSize: pageSize,
      total: 0,
      enablePagination: true
    })
    provide("store", toRefs(store))

    const emit = inject('emit');
    const onPageNoChange = (val) => {
      store.currentPage = val
      emit(ACTION__SET_LIST)
    }
    expose({})
    return () => (
        <>
          {slots.default()}
          <div class="crud-table-footer">
            <el-pagination
                background
                layout="total,prev, pager, next"
                current-page={store.currentPage}
                default-page-size={store.defaultPageSize}
                total={store.total}
                onCurrentChange={onPageNoChange}/>
          </div>
        </>
    )
  }
})
