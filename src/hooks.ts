import { inject } from 'vue';
import { PJ_DISPATCH_EVENT, PJ_EMIT_EVENT, PJ_REQUEST_METHOD, PJ_STORE } from './token';
import {
  RequestOpt,
  EventRegisterCb,
  EventDispatcherCb,
  PaginationStoreInject
} from './types';

export function useRequest(): (requestEntity: RequestOpt) => Promise<any> {
  return inject<(requestEntity: RequestOpt) => Promise<unknown>>(PJ_REQUEST_METHOD)!;
}


export function useEventRegister(): EventRegisterCb {
  return inject<EventRegisterCb>(PJ_EMIT_EVENT)!;
}

export function useEventDispatcher(): EventDispatcherCb {
  return inject<EventDispatcherCb>(PJ_DISPATCH_EVENT)!;
}


export function usePaginationStore(): PaginationStoreInject {
  return inject<PaginationStoreInject>(PJ_STORE, {});
}
