<template>
   <div class="crud-table-action">
      <slot :searchParams="searchParams" />
   </div>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import { DispatchEventCallback } from '../../types';
import { PJ_DISPATCH_EVENT } from '../../token';

const dispatchEvent = inject<DispatchEventCallback>(PJ_DISPATCH_EVENT)!;
const searchParams = dispatchEvent('getSearchFormFields');
</script>
