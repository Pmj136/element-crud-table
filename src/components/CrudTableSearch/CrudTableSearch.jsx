import {defineComponent, inject, reactive, ref, toRaw} from "vue";
import patchVModel from '../../core/patchVModel'
import {formatData} from "../../util";
import {Refresh, Search} from "@element-plus/icons-vue";
import {ACTION__SET_LIST} from "../../token";

export default defineComponent({
  name: "CrudTableSearch",
  props: {
    defaultFields: Object,
    formatter: [Object, Function]
  },
  setup({defaultFields = {}, formatter}, {expose, slots}) {
    const form = reactive({...defaultFields});
    const formRef = ref(null)
    const emit = inject("emit")
    const doSearch = () => {
      emit(ACTION__SET_LIST, formatData(toRaw(form), formatter))
    }
    const doReset = () => {
      formRef.value.resetFields()
      emit(ACTION__SET_LIST)
    }
    const getFields = () => toRaw(form)
    const setFields = data => {
      Object.assign(form, data)
    }
    const setField = (k, v) => {
      form[k] = v
    }
    const on = inject('on')
    on('setSearchFormFields', setFields)
    on('setSearchFormField', setField)
    on('getSearchFormFields', getFields)
    expose({
      getFields,
      setFields,
      setField
    })
    return () => (
        <el-form model={form} ref={formRef} inline>
          {patchVModel(slots.default(form), form)}
          <el-form-item style={{marginRight: '12px'}}>
            <el-button icon={Search} type="success" onClick={doSearch}>搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon={Refresh} type="warning" onClick={doReset}>重置</el-button>
          </el-form-item>
        </el-form>
    )
  }
})
