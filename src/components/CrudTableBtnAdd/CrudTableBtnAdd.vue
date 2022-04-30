<template>
   <el-button :icon="Plus" type="primary" @click="onBtnClick" v-bind="$attrs">
      {{ props.text }}
   </el-button>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { TYPE_ADD } from '../../token';
import { useEventDispatcher } from '../../hooks';

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

const dispatch = useEventDispatcher();
const onBtnClick = () => {
   dispatch('showDialog', {
      type: TYPE_ADD,
      title: props.dialogTitle,
      url: props.url
   });
};
</script>
