import { DialogType } from './token';

export interface RequestOpt {
  url: string;
  method?: string;
  data?: BodyInit | null;
  params?: object;

  [key: string]: any;
}

export interface PaginationStore {
  currentPage: number;
  defaultPageSize: number;
  total: number;
  enablePagination: boolean;
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
export type DispatchEventCallback = (eventName: EventName, ...args: any[]) => any
export type SetEventCallback = (eventObj: Record<string, Function>) => void
