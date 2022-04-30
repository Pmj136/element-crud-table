import { VNode } from 'vue';

export function usePatchVModel(obj?: Record<string, any> & { value: Record<string, any> }): VNode []
