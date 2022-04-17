import { defineComponent, inject, ref, ToRefs } from 'vue'
import {
    PJ_REQUEST_METHOD,
    PJ_SET_EVENT, PJ_SET_EXPOSE_EVENT,
    PJ_STORE
} from '../../token'
import { checkUnSetUrlErrLog, isDev } from '../../util'
import { PaginationStore, SetEventCallback } from '../../types'

export default defineComponent({
    name: 'CrudTableData',
    props: {
        url: {
            type: String,
            required: true
        },
        autoLoad: {
            type: Boolean,
            default: true
        }
    },
    setup({ url, autoLoad }, { slots }) {
        if (isDev) {
            checkUnSetUrlErrLog('list', url)
        }
        const fieldsCache: Record<string, any> = {}
        const isLoading = ref(true)
        const tableData = ref([])
        const {
            currentPage,
            defaultPageSize,
            total,
            enablePagination
        } = inject<Partial<ToRefs<PaginationStore>>>(PJ_STORE, {})
        const request = inject<Function>(PJ_REQUEST_METHOD)!
        const setEvent = inject<SetEventCallback>(PJ_SET_EVENT)!
        const setExposeEvent = inject<SetEventCallback>(PJ_SET_EXPOSE_EVENT)!
        const getTableData = async (resetPageNo = true, params?: Record<string, any>) => {
            if (resetPageNo && currentPage) {
                currentPage.value = 1
            }
            isLoading.value = true
            try {
                const res = await request({
                    url,
                    method: 'get',
                    params: Object.assign({
                        pageNo: currentPage?.value,
                        pageSize: defaultPageSize?.value
                    }, Object.assign(params || {}, fieldsCache))
                })
                if (enablePagination) {
                    const { records, total: resTotal } = res.data
                    if (isDev) {
                        if (!records || !resTotal) {
                            console.error('接口响应数据格式不合法')
                            return
                        }
                    }
                    tableData.value = records
                    total!.value = resTotal
                } else {
                    tableData.value = res.data
                }
            } finally {
                isLoading.value = false
            }
        }
        if (autoLoad) getTableData()
        setEvent({ getTableData })
        setExposeEvent({
            initData(params?: object) {
                getTableData(true, params)
            },
            refreshData(params?: object) {
                getTableData(false, params)
            },
            setField(fieldName: string, value: any) {
                fieldsCache[fieldName] = value
            },
        })
        return () => (
            <el-table
                v-loading={isLoading.value}
                border
                stripe
                height="100%"
                data={tableData.value}
                v-slots={{
                    empty: () => (
                        isLoading.value ? <span />
                            : (
                                <el-empty>
                                    <el-button type="primary" onClick={getTableData}>刷新</el-button>
                                </el-empty>
                            )
                    )
                }}>
                {slots.default?.()}
            </el-table>
        )
    }
})
