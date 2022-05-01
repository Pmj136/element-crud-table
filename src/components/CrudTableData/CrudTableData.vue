<template>
   <el-table v-bind="$attrs" :data="tableData" v-loading="isLoading" border stripe height="100%">
      <slot />
      <template #empty>
         <el-empty v-show="!isLoading && tableData.length===0">
            <el-button type="primary" @click="getTableData">刷新</el-button>
         </el-empty>
      </template>
   </el-table>
</template>

<script setup lang="ts">
import { checkUnSetUrlErrLog, isDev } from '../../util';
import { nextTick, ref, toRaw } from 'vue';
import { useEventRegister, usePaginationStore, useRequest } from '../../hooks';

const emits = defineEmits(['load', 'loaded', 'updated']);
const props = defineProps({
   url: String,
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

const appendParams = (fieldName: string, value: any) => {
   fieldsCache[fieldName] = value;
};

const exposeEventObj = {
   resetData(params?: object) {
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
      }
      else {
         tableData.value = res.data;
      }
      emits('updated', {
         data: toRaw(tableData.value),
         requestParams: {...fieldsCache, ...props.params}
      });
   } finally {
      await nextTick();
      isLoading.value = false;
   }
};
emits('load', {appendParams});
getTableData().then(() => {
   emits('loaded', {
      data: toRaw(tableData.value),
      requestParams: {...fieldsCache, ...props.params}
   });
});
registerEvent({getTableData}, 'inner');
registerEvent(exposeEventObj, 'expose');
</script>
