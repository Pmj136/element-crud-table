import {defineComponent, inject, ref} from "vue";
import {ACTION__SET_LIST, CRUD_TABLE_REQUEST_METHOD} from "../../token";
import {checkUnSetUrlErrLog, isDev} from "../../util";

export default defineComponent({
  name: "CrudTableData",
  props: {
    url: {
      type: String,
      required: true
    }
  },
  setup({url}, {slots}) {
    if (isDev) checkUnSetUrlErrLog('list', url)
    const {currentPage, defaultPageSize, total, enablePagination} = inject('store', {
      enablePagination: false
    });
    const on = inject("on")
    const request = inject(CRUD_TABLE_REQUEST_METHOD)

    const isLoading = ref(false)
    const tableData = ref([]);
    const setList = async (params) => {
      isLoading.value = true
      try {
        const res = await request({
          url,
          params: Object.assign({
            pageNo: currentPage?.value,
            pageSize: defaultPageSize?.value
          }, params || {})
        })
        if (enablePagination) {
          tableData.value = res.data.records
          total.value = res.data.total
        } else {
          tableData.value = res.data
        }
      } finally {
        isLoading.value = false
      }
    }
    on(ACTION__SET_LIST, setList)
    setList()

    return () => (
        <el-table
            v-loading={isLoading.value}
            border
            stripe
            height="100%"
            data={tableData.value}
            v-slots={{
              empty: () => (
                  isLoading.value ? <span/>
                      : (
                          <el-empty>
                            <el-button type="primary" onClick={setList}>刷新</el-button>
                          </el-empty>
                      )
              )
            }}>
          {slots.default()}
        </el-table>
    )
  }
})
