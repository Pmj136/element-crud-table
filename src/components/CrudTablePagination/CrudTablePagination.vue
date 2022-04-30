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
import { provide, reactive, toRefs } from 'vue';
import { PaginationStore } from '../../types';
import { PJ_STORE } from '../../token';
import { useEventDispatcher } from '../../hooks';

const props = defineProps({
   pageSize: Number
});

const dispatch = useEventDispatcher();

const privateStore = reactive<PaginationStore>({
   currentPage: 1,
   defaultPageSize: props.pageSize || 15,
   total: 0,
   enablePagination: true
});
provide(PJ_STORE, toRefs(privateStore));

const onPageNoChange = (val: number) => {
   privateStore.currentPage = val;
   dispatch('refreshData');
};
</script>
