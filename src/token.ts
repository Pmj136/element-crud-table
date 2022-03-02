export const TYPE_ADD = 'ADD'
export const TYPE_EDIT = 'EDIT'
export const TYPE_PREVIEW = 'PREVIEW'

export const ACTION__SHOW_DIALOG = 'showDialog'
export const ACTION__SET_LIST = 'setList'

export const CRUD_TABLE_REQUEST_METHOD = 'CrudTable_RequestMethod'


export type DialogType = typeof TYPE_ADD | typeof TYPE_EDIT | typeof TYPE_PREVIEW | null
export type Action = typeof ACTION__SET_LIST | typeof ACTION__SHOW_DIALOG

export type ActionSetList = typeof ACTION__SET_LIST
export type ActionShowDialog = typeof ACTION__SHOW_DIALOG
