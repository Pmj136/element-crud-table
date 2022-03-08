export const TYPE_ADD = 'ADD'
export const TYPE_EDIT = 'EDIT'
export const TYPE_PREVIEW = 'PREVIEW'


export const PJ_REQUEST_METHOD = Symbol('pj_requestMethod')
export const PJ_SET_EXPOSE_EVENT = Symbol('pj_setExposeEvent')
export const PJ_SET_EVENT = Symbol('pj_setEvent')
export const PJ_DISPATCH_EVENT = Symbol('pj_dispatchEvent')
export const PJ_STORE = Symbol('pj_store')

export type DialogType = typeof TYPE_ADD | typeof TYPE_EDIT | typeof TYPE_PREVIEW | null




