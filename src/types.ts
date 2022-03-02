import { DialogType } from './token'

export interface RequestOpt {
  url: string;
  method?: string;
  data?: BodyInit | null;
  params?: object;

  [key: string]: any
}

export interface FuncAskOpt {
  type: any;
  title: string;
  loadingText: string;
  successTip: string;

  [key: string]: any;
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


interface RowData {
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
