<template>
   <el-table :data="tableData" v-loading="isLoading" border stripe height="100%">
      <slot />
      <template #empty>
         <span v-show="isLoading" />
         <el-empty v-show="!isLoading">
            <el-button type="primary" @click="getTableData">刷新</el-button>
         </el-empty>
      </template>
   </el-table>
</template>

<script setup lang="ts">
import { checkUnSetUrlErrLog, isDev } from '../../util';
import { ref } from 'vue';
import { useEventRegister, usePaginationStore, useRequest } from '../../hooks';

const emits = defineEmits(['load', 'loaded']);
const props = defineProps({
   url: {
      type: String,
      required: true
   },
   autoLoad: {
      type: Boolean,
      default: true
   },
   params: Object
});

if (isDev) {
   checkUnSetUrlErrLog('list', props.url);
}
const fieldsCache: Record<string, any> = {};
const isLoading = ref(true);
const tableData = ref([]);
const {
   currentPage,
   defaultPageSize,
   total,
   enablePagination
} = usePaginationStore();
const request = useRequest();
const registerEvent = useEventRegister();

const exposeEventObj = {
   initData(params?: object) {
      getTableData(true, params);
   },
   refreshData(params?: object) {
      getTableData(false, params);
   },
   setField(fieldName: string, value: any) {
      fieldsCache[fieldName] = value;
   }
};
const getTableData = async (resetPageNo = true, params?: Record<string, any>) => {
   if (resetPageNo && currentPage) {
      currentPage.value = 1;
   }
   emits('load', exposeEventObj);
   isLoading.value = true;
   try {
      const res = await request({
         url: props.url!,
         method: 'get',
         params: Object.assign({
            pageNo: currentPage?.value,
            pageSize: defaultPageSize?.value
         }, Object.assign(params || {}, fieldsCache, props.params || {}))
      });
      if (enablePagination) {
         const {records, total: resTotal} = res.data;
         if (isDev) {
            if (!records || !resTotal) {
               console.error('接口响应数据格式不合法');
               return;
            }
         }
         tableData.value = records;
         total!.value = resTotal;
         emits('loaded');
      }
      else {
         tableData.value = res.data;
      }
   } finally {
      isLoading.value = false;
   }
};
if (props.autoLoad) getTableData();
registerEvent({getTableData}, 'inner');
registerEvent(exposeEventObj, 'expose');
</script>
