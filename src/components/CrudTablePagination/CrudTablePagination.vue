<template>
   <slot />
   <div class="crud-table-footer">
      <el-pagination
         background
         layout="total,prev, pager, next"
         :current-page="privateStore.currentPage"
         :default-current-page="privateStore.defaultPageSize"
         :total="privateStore.total"
         @current-change="onPageNoChange" />
   </div>
</template>

<script setup lang="ts">
import { inject, provide, reactive, toRefs } from 'vue';
import { DispatchEventCallback, PaginationStore } from '../../types';
import { PJ_DISPATCH_EVENT, PJ_STORE } from '../../token';

const props = defineProps({
   pageSize: Number
});
const privateStore = reactive<PaginationStore>({
   currentPage: 1,
   defaultPageSize: props.pageSize || 15,
   total: 0,
   enablePagination: true
});
provide(PJ_STORE, toRefs(privateStore));
const dispatchEvent = inject<DispatchEventCallback>(PJ_DISPATCH_EVENT)!;
const onPageNoChange = (val: number) => {
   privateStore.currentPage = val;
   dispatchEvent('refreshData');
};
</script>
