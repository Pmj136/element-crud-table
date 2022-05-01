<template>
   <el-button type="text" style="color: #e06161" @click="onBtnClick" v-bind="$attrs">
      {{ props.text }}
   </el-button>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { checkCompUsePosition, checkUnSetUrlErrLog, combineUrl, isDev } from '../../util';
import { useEventDispatcher, useRequest } from '../../hooks';

const props = defineProps({
   text: {
      type: String,
      default: '删除'
   },
   url: String,
   tableData: Object
});
const tableData = props.tableData;

if (isDev) {
   checkCompUsePosition(!!tableData, 'CrudTableBtnDel', 'CrudTableHandler');
}

const dispatch = useEventDispatcher();
const request = useRequest();
const onBtnClick = () => {
   if (isDev) {
      checkUnSetUrlErrLog('del', props.url);
   }
   ElMessageBox
      .confirm('此操作将删除该记录, 是否继续？', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning',
         draggable: true,
         roundButton: true,
         beforeClose: async (action, instance, done) => {
            if (action === 'cancel') {
               done();
            }
            else {
               try {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = '正在删除';
                  const res = await request({
                     url: combineUrl(props.url!, tableData!.row.id),
                     method: 'delete'
                  });
                  ElMessage.success(res.msg || '删除成功');
                  done();
               } catch (e) {
                  instance.confirmButtonText = '重试';
                  console.log(e);
               } finally {
                  instance.confirmButtonLoading = false;
               }
            }
         }
      })
      .then(() => {
         dispatch('refreshData');
      })
      .catch(e => e);
};
</script>
