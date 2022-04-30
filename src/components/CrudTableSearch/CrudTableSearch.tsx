import { defineComponent, reactive, Ref, ref, toRaw } from 'vue';
import { Refresh, Search } from '@element-plus/icons-vue';
import patchVModel from '../../patchVModel';
import { formatData } from '../../util';
import { useEventDispatcher, useEventRegister } from '../../hooks';

export default defineComponent({
  name: 'CrudTableSearch',
  props: {
    defaultFields: Object,
    formatter: [Object, Function]
  },
  setup({defaultFields = {}, formatter}, {slots}) {
    const form = reactive<Record<string, any>>({...defaultFields});
    const formRef = ref<Ref | null>(null);

    const registerEvent = useEventRegister();
    const dispatchEvent = useEventDispatcher();

    const doReset = () => {
      formRef?.value?.resetFields();
      dispatchEvent('getTableData');
      registerEvent({
        refreshData() {
          dispatchEvent('getTableData', false);
        }
      }, 'expose');
    };
    const doSearch = () => {
      const params = formatData(toRaw(form), formatter);
      dispatchEvent('getTableData', true, params);
      registerEvent({
        refreshData() {
          dispatchEvent('getTableData', false, params);
        }
      }, 'expose');
    };
    registerEvent({
      setSearchFormFields(fields: Record<string, any>) {
        Object.assign(form, fields);
      },
      setSearchFormField(fieldName: string, value: any) {
        form[fieldName] = value;
      },
      getSearchFormFields() {
        return toRaw(form);
      }
    }, 'expose');
    return () => (
       <el-form model={form} ref={formRef} inline>
         {patchVModel(slots.default?.(form), form)}
         <el-form-item style={{marginRight: '12px'}}>
           <el-button icon={Search} type="success" onClick={doSearch}>搜索</el-button>
         </el-form-item>
         <el-form-item>
           <el-button icon={Refresh} type="warning" onClick={doReset}>重置</el-button>
         </el-form-item>
       </el-form>
    );
  }
});
