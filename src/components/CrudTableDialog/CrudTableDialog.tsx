import { defineComponent, inject, Ref, ref, toRaw } from 'vue'
import { Printer } from '@element-plus/icons-vue'
import patchVModel from '../../patchVModel'
import { checkUnSetUrlErrLog, combineUrl, formatData, isDev } from '../../util'
import {
  ACTION__SHOW_DIALOG,
  CRUD_TABLE_REQUEST_METHOD,
  DialogType,
  TYPE_ADD,
  TYPE_EDIT,
  TYPE_PREVIEW
} from '../../token'
import { ShowDialogArgs } from '../../types'

const DYNAMIC_REQ_METHOD: Record<string, string> = {
  [TYPE_ADD]: 'post',
  [TYPE_EDIT]: 'put'
}
export default defineComponent({
  name: 'CrudTableDialog',
  props: {
    formProps: Object,
    defaultFields: Object,
    inFormatter: [Object, Function],
    outFormatter: [Object, Function]
  },
  setup({inFormatter, outFormatter, defaultFields = {}, formProps = {}},
        {slots, attrs, expose}) {
    let reqUrl: string | null = null
    const request = inject<Function>(CRUD_TABLE_REQUEST_METHOD)
    const form = ref({...defaultFields})
    const formRef = ref<Ref | null>(null)
    const visible = ref(false) //弹窗可见性
    const dType = ref<DialogType>(null) //弹窗类型
    const dTitle = ref<string | null>(null) //弹窗标题
    const doTask = async (t: string) => {
      if (t !== TYPE_PREVIEW) {
        return request!({
          url: reqUrl,
          method: DYNAMIC_REQ_METHOD[t],
          data: formatData(toRaw(form.value), outFormatter)
        })
      }
      return Promise.resolve()
    }
    const onDialogClosed = () => {
      visible.value = false
      formRef.value.resetFields()
      form.value = defaultFields
    }
    const onDialogConfirm = () => {
      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          try {
            await doTask(dType.value!)
          } catch (e) {
            console.log(e)
          } finally {
            reqUrl = null
            visible.value = false
          }
        }
      })
    }
    const getFields = () => toRaw(form.value)
    const setFields = (data: object) => {
      Object.assign(form.value, data)
    }
    const setField = (k: string, v: any) => {
      form.value[k] = v
    }
    const on = inject<Function>('on')
    on!(ACTION__SHOW_DIALOG, ({type, title, url, extraData}: ShowDialogArgs) => {
      if (isDev) {
        checkUnSetUrlErrLog(type!, url)
      }
      if (url !== undefined) {
        reqUrl = type === TYPE_ADD ? url : combineUrl(url, extraData!.id as string)
      }
      if (extraData !== undefined) {
        form.value = formatData(extraData, inFormatter)
      }
      if (type !== dType.value) {
        dTitle.value = title
        dType.value = type
      }
      visible.value = true
    })
    on!('setDialogFormFields', setFields)
    on!('setDialogFormField', setField)
    on!('getSearchFormFields', getFields)
    expose({
      getFields,
      setFields,
      setField
    })
    return () => (
      <el-dialog
        title={ dTitle.value }
        v-model={ visible.value }
        onClosed={ onDialogClosed }
        append-to-body
        { ...attrs }
        v-slots={ {
          footer: () => (
            <>
              <el-button onClick={ () => {
                visible.value = false
              } }>取消
              </el-button>
              {
                dType.value === TYPE_PREVIEW
                  ? <el-button icon={ Printer } type="primary" onClick={ onDialogConfirm }>打印</el-button>
                  : <el-button type="success" onClick={ onDialogConfirm }>确定</el-button>
              }
            </>
          )
        } }
      >
        <el-form
          key={ dType.value }
          inline
          label-position="left"
          label-width="110px"
          model={ form.value }
          ref={ formRef }
          { ...formProps }>
          { patchVModel(slots.default?.({
            form: form.value,
            type: dType.value
          }), form.value, dType.value === TYPE_PREVIEW) }
        </el-form>
      </el-dialog>
    )
  }
})
