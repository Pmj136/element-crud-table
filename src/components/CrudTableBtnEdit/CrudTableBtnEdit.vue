<template>
   <el-button type="text" @click="onBtnClick" v-bind="$attrs">
      {{ props.text }}
   </el-button>
</template>
<script setup lang="ts">
import { TYPE_EDIT } from '../../token';
import { checkCompUsePosition, isDev } from '../../util';
import { useEventDispatcher } from '../../hooks';

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

const dispatch = useEventDispatcher();
const onBtnClick = () => {
   dispatch('showDialog', {
      type: TYPE_EDIT,
      title: props.dialogTitle,
      url: props.url,
      echoUrl: props.echoUrl,
      extraData: props.tableData!.row
   });
};
</script>
