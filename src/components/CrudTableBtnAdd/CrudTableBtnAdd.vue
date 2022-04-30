<template>
   <el-button :icon="Plus" type="primary" @click="onBtnClick" v-bind="$attrs">
      {{ props.text }}
   </el-button>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { PJ_DISPATCH_EVENT, TYPE_ADD } from '../../token';
import { DispatchEventCallback } from '../../types';

const dispatchEvent = inject<DispatchEventCallback>(PJ_DISPATCH_EVENT)!;
const props = defineProps({
   text: {
      type: String,
      default: '新增'
   },
   url: String,
   dialogTitle: {
      type: String,
      default: '新增'
   }
});
const onBtnClick = () => {
   dispatchEvent('showDialog', {
      type: TYPE_ADD,
      title: props.dialogTitle,
      url: props.url
   });
};
</script>
