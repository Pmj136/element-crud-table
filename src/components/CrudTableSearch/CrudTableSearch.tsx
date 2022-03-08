import { defineComponent, inject, reactive, Ref, ref, toRaw } from 'vue'
import { Refresh, Search } from '@element-plus/icons-vue'
import patchVModel from '../../patchVModel'
import { formatData } from '../../util'
import { PJ_DISPATCH_EVENT, PJ_SET_EXPOSE_EVENT } from '../../token'
import { DispatchEventCallback, SetEventCallback } from '../../types'

export default defineComponent({
  name: 'CrudTableSearch',
  props: {
    defaultFields: Object,
    formatter: [Object, Function]
  },
  setup({defaultFields = {}, formatter}, {slots}) {
    const form = reactive<Record<string, any>>({...defaultFields})
    const formRef = ref<Ref | null>(null)

    const setExposeEvent = inject<SetEventCallback>(PJ_SET_EXPOSE_EVENT)!
    const dispatchEvent = inject<DispatchEventCallback>(PJ_DISPATCH_EVENT)!

    const doReset = () => {
      formRef?.value?.resetFields()
      dispatchEvent('getTableData')
      setExposeEvent({
        refreshData() {
          dispatchEvent('getTableData', false)
        }
      })
    }
    const doSearch = () => {
      const params = formatData(toRaw(form), formatter)
      dispatchEvent('getTableData', true, params)
      setExposeEvent({
        refreshData() {
          dispatchEvent('getTableData', false, params)
        }
      })
    }
    setExposeEvent({
      setSearchFormFields(fields: Record<string, any>) {
        Object.assign(form, fields)
      },
      setSearchFormField(fieldName: string, value: any) {
        form[fieldName] = value
      },
      getSearchFormFields() {
        return toRaw(form)
      }
    })
    return () => (
      <el-form model={ form } ref={ formRef } inline>
        { patchVModel(slots.default?.(form), form) }
        <el-form-item style={ {marginRight: '12px'} }>
          <el-button icon={ Search } type="success" onClick={ doSearch }>搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon={ Refresh } type="warning" onClick={ doReset }>重置</el-button>
        </el-form-item>
      </el-form>
    )
  }
})
