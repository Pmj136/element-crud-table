<template>
   <el-button type="text" v-bind="$attrs" @click="onBtnClick">
      {{ props.text }}
   </el-button>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { PJ_DISPATCH_EVENT, TYPE_PREVIEW } from '../../token';
import { checkCompUsePosition, isDev } from '../../util';
import { DispatchEventCallback } from '../../types';

const props = defineProps({
   text: {
      type: String,
      default: '预览'
   },
   dialogTitle: {
      type: String,
      default: '预览'
   },
   echoUrl: String,
   tableData: Object
});
if (isDev) {
   checkCompUsePosition(!!props.tableData, 'CrudTableBtnPreview', 'CrudTableHandler');
}

const dispatchEvent = inject<DispatchEventCallback>(PJ_DISPATCH_EVENT)!;
const onBtnClick = () => {
   dispatchEvent('showDialog', {
      type: TYPE_PREVIEW,
      title: props.dialogTitle,
      echoUrl: props.echoUrl,
      extraData: props.tableData!.row
   });
};
</script>
