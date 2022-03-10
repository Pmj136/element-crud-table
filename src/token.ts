export const TYPE_ADD = 'ADD'
export const TYPE_EDIT = 'EDIT'
export const TYPE_PREVIEW = 'PREVIEW'


export const PJ_REQUEST_METHOD = Symbol('pj_requestMethod')
export const PJ_SET_EXPOSE_EVENT = Symbol('pj_setExposeEvent')
export const PJ_SET_EVENT = Symbol('pj_setEvent')
export const PJ_DISPATCH_EVENT = Symbol('pj_dispatchEvent')
export const PJ_STORE = Symbol('pj_store')

export type DialogType = typeof TYPE_ADD | typeof TYPE_EDIT | typeof TYPE_PREVIEW | null

export const enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1,
  STATEFUL_COMPONENT = 1 << 2,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}


