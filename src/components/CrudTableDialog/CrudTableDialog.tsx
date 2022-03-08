import { defineComponent, inject, Ref, ref, toRaw } from 'vue'
import { Printer } from '@element-plus/icons-vue'
import patchVModel from '../../patchVModel'
import { checkUnSetUrlErrLog, combineUrl, formatData, isDev } from '../../util'
import {
  DialogType,
  PJ_DISPATCH_EVENT,
  PJ_REQUEST_METHOD,
  PJ_SET_EVENT, PJ_SET_EXPOSE_EVENT,
  TYPE_ADD,
  TYPE_EDIT,
  TYPE_PREVIEW
} from '../../token'
import { DispatchEventCallback, SetEventCallback, ShowDialogArgs } from '../../types'

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
        {slots, attrs}) {
    let reqUrl: string | null = null

    const form = ref({...defaultFields})
    const formRef = ref<Ref | null>(null)
    const visible = ref(false) //弹窗可见性
    const dType = ref<DialogType>(null) //弹窗类型
    const dTitle = ref<string | null>(null) //弹窗标题
    const loadData = ref(false)
    const isConfirm = ref(false)

    const request = inject<Function>(PJ_REQUEST_METHOD)!
    const setEvent = inject<SetEventCallback>(PJ_SET_EVENT)!
    const setExposeEvent = inject<SetEventCallback>(PJ_SET_EXPOSE_EVENT)!
    const dispatchEvent = inject<DispatchEventCallback>(PJ_DISPATCH_EVENT)!

    const onDialogClosed = () => {
      visible.value = false
      formRef.value.resetFields()
      form.value = defaultFields
    }
    const onDialogConfirm = () => {
      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          isConfirm.value = true
          try {
            const t = dType.value!
            await request({
              url: reqUrl,
              method: DYNAMIC_REQ_METHOD[t],
              data: formatData(toRaw(form.value), outFormatter)
            })
            if (t === TYPE_ADD) {
              dispatchEvent('initData')
            }
            if (t === TYPE_EDIT) {
              dispatchEvent('refreshData')
            }
          } catch (e) {
            console.log(e)
          } finally {
            reqUrl = null
            isConfirm.value = false
            visible.value = false
          }
        }
      })
    }
    const setRefreshData = async (echoUrl: string, id: string) => {
      loadData.value = true
      try {
        const freshData = await request!({url: combineUrl(echoUrl, id)})
        form.value = formatData(freshData, inFormatter)
      } catch (e) {
        console.log(e)
      } finally {
        loadData.value = false
      }
    }
    setEvent({
      showDialog({type, title, url, extraData, echoUrl}: ShowDialogArgs) {
        if (isDev) {
          checkUnSetUrlErrLog(type!, url)
        }
        if (extraData !== undefined) {
          form.value = formatData(extraData, inFormatter)
        }
        if (url !== undefined) {
          reqUrl = url
        }
        if (type !== dType.value) {
          dTitle.value = title
          dType.value = type
        }
        visible.value = true
        if (echoUrl && type !== TYPE_ADD) {
          setRefreshData(echoUrl, extraData!.id as string)
        }
      }
    })
    setExposeEvent({
      setDialogFormFields(fields: Record<string, any>) {
        Object.assign(form.value, fields)
      },
      setDialogFormField(fieldName: string, value: any) {
        form.value[fieldName] = value
      },
      getDialogFormFields() {
        return toRaw(form.value)
      }
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
                  : <el-button loading={ isConfirm.value } type="success" onClick={ onDialogConfirm }>确定</el-button>
              }
            </>
          )
        } }
      >
        <el-form
          v-loading={ loadData.value }
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