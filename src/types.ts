import { DialogType } from './token'

export interface RequestOpt {
  url: string;
  method?: string;
  data?: BodyInit | null;
  params?: object;

  [key: string]: any
}

export interface CrudTableBtnOpts {
  tableData?: {
    row: {
      id: any;
      [key: string]: any;
    };
    $index: number;
  };
  text: string;
  url?: string;

  [key: string]: any
}

export interface PaginationStore {
  currentPage: number;
  defaultPageSize: number;
  total: number;
  enablePagination: boolean;
}


export interface RowData {
  id: number | string;

  [key: string]: any
}

export interface ShowDialogArgs {
  type: DialogType;
  title: string;
  extraData?: RowData;
  url?: string;
  echoUrl?: string;
}

export type DispatchEventCallback = (eventName: string, ...args: any[]) => void
export type SetEventCallback = (eventObj: Record<string, Function>) => void
