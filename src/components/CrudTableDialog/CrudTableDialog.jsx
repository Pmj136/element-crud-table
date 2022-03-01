import {defineComponent, inject, ref, toRaw} from "vue";
import patchVModel from '../../core/patchVModel'
import {checkUnSetUrlErrLog, combineUrl, formatData, isDev} from "../../util";
import {Printer} from "@element-plus/icons-vue";
import {ACTION__SHOW_DIALOG, CRUD_TABLE_REQUEST_METHOD, TYPE_ADD, TYPE_EDIT, TYPE_PREVIEW} from "../../token";

const DYNAMIC_REQ_METHOD = {
  [TYPE_ADD]: 'post',
  [TYPE_EDIT]: 'put'
}
export default defineComponent({
  name: "CrudTableDialog",
  props: {
    formProps: Object,
    defaultFields: Object,
    inFormatter: [Object, Function],
    outFormatter: [Object, Function]
  },
  setup({inFormatter, outFormatter, defaultFields = {}, formProps = {}},
        {slots, attrs, expose}) {
    let reqUrl = null
    const request = inject(CRUD_TABLE_REQUEST_METHOD)
    const form = ref({...defaultFields});
    const formRef = ref(null);
    const visible = ref(false); //弹窗可见性
    const dType = ref(null) //弹窗类型
    const dTitle = ref(null) //弹窗标题
    const loadData = ref(false)
    const doTask = async t => {
      if (t !== TYPE_PREVIEW) {
        return request({
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
      formRef.value.validate(async (valid) => {
        if (valid) {
          try {
            await doTask(dType.value)
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
    const setFields = data => {
      Object.assign(form.value, data)
    }
    const setField = (k, v) => {
      form.value[k] = v
    }
    const setRefreshData = async (echoUrl, id) => {
      loadData.value = true
      try {
        const freshData = await request({url: combineUrl(echoUrl, id)})
        form.value = formatData(freshData, inFormatter)
      } catch (e) {
        console.log(e)
      } finally {
        loadData.value = false
      }
    }
    const on = inject('on')
    on(ACTION__SHOW_DIALOG, ({dialogType = TYPE_ADD, dialogTitle = "新增", url, rowData, echoUrl}) => {
      if (isDev) {
        checkUnSetUrlErrLog(dialogType, url)
      }
      if (url !== undefined) {
        reqUrl = dialogType === TYPE_ADD ? url : combineUrl(url, rowData.id)
      }
      if (rowData !== undefined && echoUrl === undefined) {
        form.value = formatData(rowData, inFormatter)
      }
      if (dialogType !== dType.value) {
        dTitle.value = dialogTitle
        dType.value = dialogType
      }
      visible.value = true
      if (echoUrl && dialogType !== TYPE_ADD) {
        setRefreshData(echoUrl, rowData.id)
      }
    })
    on('setDialogFormFields', setFields)
    on('setDialogFormField', setField)
    on('getSearchFormFields', getFields)
    expose({
      getFields,
      setFields,
      setField
    })
    return () => (
        <el-dialog
            title={dTitle.value}
            v-model={visible.value}
            onClosed={onDialogClosed}
            append-to-body
            {...attrs}
            v-slots={{
              footer: () => (
                  <>
                    <el-button onClick={() => {
                      visible.value = false
                    }}>取消
                    </el-button>
                    {
                      dType.value === TYPE_PREVIEW
                          ? <el-button icon={Printer} type="primary" onClick={onDialogConfirm}>打印</el-button>
                          : <el-button type="success" onClick={onDialogConfirm}>确定</el-button>
                    }
                  </>
              )
            }}
        >
          <el-form
              v-loading={loadData.value}
              key={dType.value}
              inline
              label-position="left"
              label-width="110px"
              model={form.value}
              ref={formRef}
              {...formProps}>
            {patchVModel(slots.default({
              form: form.value,
              type: dType.value
            }), form.value, dType.value === TYPE_PREVIEW)}
          </el-form>
        </el-dialog>
    )
  }
})
