import { defineComponent, inject, reactive, Ref, ref, toRaw } from 'vue'
import patchVModel from '../../patchVModel'
import { formatData } from '../../util'
import { Refresh, Search } from '@element-plus/icons-vue'
import { ACTION__SET_LIST } from '../../token'
import { useDispatchAction } from '../../hooks'

export default defineComponent({
  name: 'CrudTableSearch',
  props: {
    defaultFields: Object,
    formatter: [Object, Function]
  },
  setup({defaultFields = {}, formatter}, {expose, slots}) {
    const form = reactive<Record<string, any>>({...defaultFields})
    const formRef = ref<Ref | null>(null)
    const searchList = useDispatchAction(ACTION__SET_LIST, formatData(toRaw(form), formatter))
    const resetList = useDispatchAction(ACTION__SET_LIST)
    const doReset = () => {
      formRef?.value?.resetFields()
      resetList()
    }
    const getFields = () => toRaw(form)
    const setFields = (data: Record<string, any>) => {
      Object.assign(form, data)
    }
    const setField = (k: string, v: any) => {
      form[k] = v
    }
    const on = inject<Function>('on')
    on!('setSearchFormFields', setFields)
    on!('setSearchFormField', setField)
    on!('getSearchFormFields', getFields)
    expose({
      getFields,
      setFields,
      setField
    })
    return () => (
      <el-form model={ form } ref={ formRef } inline>
        { patchVModel(slots.default?.(form), form) }
        <el-form-item style={ {marginRight: '12px'} }>
          <el-button icon={ Search } type="success" onClick={ searchList }>搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button icon={ Refresh } type="warning" onClick={ doReset }>重置</el-button>
        </el-form-item>
      </el-form>
    )
  }
})
