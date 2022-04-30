<template>
   <el-button type="text" v-bind="$attrs" @click="onBtnClick">
      {{ props.text }}
   </el-button>
</template>
<script setup lang="ts">
import { inject, useSlots } from 'vue';
import { PJ_DISPATCH_EVENT, TYPE_EDIT } from '../../token';
import { checkCompUsePosition, isDev } from '../../util';
import { DispatchEventCallback } from '../../types';

const props = defineProps({
   text: {
      type: String,
      default: '编辑'
   },
   url: String,
   dialogTitle: {
      type: String,
      default: '编辑'
   },
   echoUrl: String,
   tableData: Object
});
if (isDev) {
   checkCompUsePosition(!!props.tableData, 'CrudTableBtnEdit', 'CrudTableHandler');
}

const dispatchEvent = inject<DispatchEventCallback>(PJ_DISPATCH_EVENT)!;
const onBtnClick = () => {
   dispatchEvent('showDialog', {
      type: TYPE_EDIT,
      title: props.dialogTitle,
      url: props.url,
      echoUrl: props.echoUrl,
      extraData: props.tableData!.row
   });
};
</script>
