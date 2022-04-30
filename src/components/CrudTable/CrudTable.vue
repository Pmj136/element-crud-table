<template>
   <div class="crud-table" :style="{'row-gap':props.gap+'px'}">
      <slot />
   </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, provide } from 'vue';
import { DispatchEventCallback, SetEventCallback } from '../../types';
import { PJ_DISPATCH_EVENT, PJ_SET_EVENT, PJ_SET_EXPOSE_EVENT } from '../../token';

const props = defineProps({
   gap: {
      type: Number,
      default: 0
   }
});
const emits = defineEmits(['ready']);
//@ts-ignore
let events = Object.create(null);
let eventsExpose = Object.create(events);

provide<SetEventCallback>(PJ_SET_EVENT, (eventObj) => {
   events || (events = {});
   Object.assign(events, eventObj);
});
provide<SetEventCallback>(PJ_SET_EXPOSE_EVENT, (eventObj) => {
   eventsExpose || (eventsExpose = {});
   Object.assign(eventsExpose, eventObj);
});
provide<DispatchEventCallback>(PJ_DISPATCH_EVENT, (eventName, ...args) => {
   const event = eventsExpose![eventName];
   return event?.(...args);
});

defineExpose(eventsExpose);
onMounted(() => {
   emits('ready', eventsExpose);
});

onUnmounted(() => {
   events = null;
   eventsExpose = null;
});
</script>
