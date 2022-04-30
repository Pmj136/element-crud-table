<template>
   <div class="crud-table-action">
      <slot :searchParams="searchParams" />
   </div>
</template>
<script setup lang="ts">
import { useEventDispatcher } from '../../hooks';

const dispatch = useEventDispatcher();
const searchParams = dispatch('getSearchFormFields');
</script>
