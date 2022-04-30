<template>
   <div class="crud-table" :style="{'row-gap':props.gap+'px'}">
      <slot />
   </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, provide } from 'vue';
import { PJ_DISPATCH_EVENT, PJ_EMIT_EVENT } from '../../token';
import { EventDispatcherCb, EventRegisterCb } from '../../types';

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

provide<EventRegisterCb>(PJ_EMIT_EVENT, (eventObj, type) => {
   if (type === 'inner') {
      events || (events = {});
      Object.assign(events, eventObj);
   }
   if (type === 'expose') {
      eventsExpose || (eventsExpose = {});
      Object.assign(eventsExpose, eventObj);
   }
});

provide<EventDispatcherCb>(PJ_DISPATCH_EVENT, (eventName, ...args) => {
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
