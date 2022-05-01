import { defineComponent, Ref, ref, toRaw } from 'vue';
import { Printer } from '@element-plus/icons-vue';
import patchVModel from '../../patchVModel';
import { checkUnSetUrlErrLog, combineUrl, formatData, isDev } from '../../util';
import {
  DialogType,
  TYPE_ADD,
  TYPE_EDIT,
  TYPE_PREVIEW
} from '../../token';
import { ShowDialogArgs } from '../../types';
import { useEventDispatcher, useEventRegister, useRequest } from '../../hooks';

const DYNAMIC_REQ_METHOD: Record<string, string> = {
  [TYPE_ADD]: 'post',
  [TYPE_EDIT]: 'put'
};
export default defineComponent({
  name: 'CrudTableDialog',
  props: {
    debug: Boolean,
    formProps: Object,
    defaultFields: Object,
    inFormatter: [Object, Function],
    outFormatter: [Object, Function]
  },
  emits: ['open', 'opened', 'confirm'],
  setup({debug = false, inFormatter, outFormatter, defaultFields = {}, formProps = {}},
        {slots, attrs, emit}) {
    let reqUrl: string | null = null;

    const form = ref({...defaultFields});
    const formRef = ref<Ref | null>(null);
    const visible = ref(false); //弹窗可见性
    const dType = ref<DialogType>(null); //弹窗类型
    const dTitle = ref<string | null>(null); //弹窗标题
    const loadData = ref(false);
    const isConfirm = ref(false);

    const request = useRequest();
    const registerEvent = useEventRegister();
    const dispatchEvent = useEventDispatcher();

    const onDialogClosed = () => {
      visible.value = false;
      formRef.value.resetFields();
      // if (dType.value === TYPE_ADD)
      //   form.value = defaultFields;
    };
    const onDialogConfirm = () => {
      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          isConfirm.value = true;
          try {
            const t = dType.value!;
            if (isDev) {
              if (debug) {
                console.log('【DEBUG】', {
                  url: reqUrl,
                  method: DYNAMIC_REQ_METHOD[t],
                  data: formatData(toRaw(form.value), outFormatter)
                });
                return;
              }
            }
            const res = await request({
              url: reqUrl!,
              method: DYNAMIC_REQ_METHOD[t],
              data: formatData(toRaw(form.value), outFormatter)
            });
            if (t === TYPE_ADD) {
              dispatchEvent('initData');
            }
            if (t === TYPE_EDIT) {
              dispatchEvent('refreshData');
            }
            emit('confirm', t, res);
            visible.value = false;
            reqUrl = null;
          } catch (e) {
            console.log(e);
          } finally {
            isConfirm.value = false;
          }
        }
      });
    };
    const setRefreshData = async (echoUrl: string, id: string) => {
      loadData.value = true;
      try {
        const freshData = await request({url: combineUrl(echoUrl, id)});
        form.value = formatData(freshData, inFormatter);
        return Promise.resolve();
      } catch (e) {
        console.log(e);
      } finally {
        loadData.value = false;
      }
    };
    const exposeEventObj = {
      setDialogFormFields(fields: Record<string, any>) {
        Object.assign(form.value, fields);
      },
      setDialogFormField(fieldName: string, value: any) {
        form.value[fieldName] = value;
      },
      getDialogFormFields() {
        return toRaw(form.value);
      }
    };
    registerEvent({
      async showDialog({type, title, url, extraData, echoUrl}: ShowDialogArgs) {
        if (isDev) {
          checkUnSetUrlErrLog(type!, url);
        }
        if (type === TYPE_ADD) {
          form.value = defaultFields;
        }
        if (extraData !== undefined) {
          form.value = formatData(extraData, inFormatter);
        }
        if (url !== undefined) {
          reqUrl = url;
        }
        if (type !== dType.value) {
          dTitle.value = title;
          dType.value = type;
        }
        emit('open', type, exposeEventObj);
        visible.value = true;
        if (echoUrl && type !== TYPE_ADD) {
          await setRefreshData(echoUrl, extraData!.id as string);
          emit('opened', type, toRaw(form.value));
        }
        else {
          emit('opened', type, toRaw(extraData));
        }
      }
    }, 'inner');
    registerEvent(exposeEventObj, 'expose');
    return () => (
       <el-dialog
          title={dTitle.value}
          v-model={visible.value}
          onClosed={onDialogClosed}
          append-to-body
          close-on-click-modal={false}
          {...attrs}
          v-slots={{
            footer: () => {
              if (dType.value === TYPE_PREVIEW) {
                return (
                   <el-button onClick={() => {
                     visible.value = false;
                   }}>确定</el-button>
                );
              }
              return (
                 <>
                   <el-button onClick={() => {
                     visible.value = false;
                   }}>取消
                   </el-button>
                   <el-button loading={isConfirm.value} type="success"
                              onClick={onDialogConfirm}>确定
                   </el-button>
                 </>
              );
            }
          }}
       >
         <el-form
            ref={formRef}
            v-loading={loadData.value}
            key={dType.value}
            inline
            label-position="left"
            label-width="110px"
            model={form.value}
            {...formProps}>
           {patchVModel(slots.default?.({
             form: form.value,
             type: dType.value
           }), form.value, dType.value === TYPE_PREVIEW)}
         </el-form>
       </el-dialog>
    );
  }
});
