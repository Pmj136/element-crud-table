import { DialogType } from './token';
import { ToRefs } from 'vue';

export interface RequestOpt {
  url: string;
  method?: string;
  data?: BodyInit | Record<string, any> | null;
  params?: object;

  [key: string]: any;
}

export interface RowData {
  id: number | string;

  [key: string]: any;
}

export interface ShowDialogArgs {
  type: DialogType;
  title: string;
  extraData?: RowData;
  url?: string;
  echoUrl?: string;
}

type EventName = 'showDialog' | 'setDialogFormFields' | 'setDialogFormField'
   | 'getSearchFormFields' | 'initData' | 'refreshData' | 'setField' | 'getTableData'


export type EventRegisterCb = (eventObj: Record<string, Function>, type: 'inner' | 'expose') => void
export type EventDispatcherCb = (eventName: EventName, ...args: any[]) => any

export type PaginationStore = {
  currentPage: number;
  defaultPageSize: number;
  total: number;
  enablePagination: boolean;
}
export type PaginationStoreInject = Partial<ToRefs<PaginationStore>>
