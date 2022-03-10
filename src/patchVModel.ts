import { Fragment, h, VNode } from 'vue'
import { ShapeFlags } from './token'

export default function patchVModel(vNodes: any[] | undefined, obj: Record<string, any>, isReadonly = false): VNode [] {
  if (!vNodes) return []
  return vNodes.map(node => {
    const {type: nodeType, shapeFlag} = node
    if (nodeType.name === 'ElFormItem') {
      const {prop, skip} = node.props || {}
      if (skip !== undefined) return node
      if (!prop) console.error('请给 ElFormItem 设置 prop 属性')
      const childrenNode = node.children['default']()
      return h(node, () => childrenNode.map((child: VNode) => {
        if (isReadonly) {
          return h(child, {
            modelValue: obj[prop],
            readonly: true
          })
        }
        return h(child, {
          modelValue: obj[prop],
          'onUpdate:modelValue': (value: any) => {
            obj[prop] = value
          }
        })
      }))
    }
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      return node
    }
    if ((shapeFlag & ShapeFlags.COMPONENT)) {
      let newNode: VNode = node
      if (shapeFlag & ShapeFlags.SLOTS_CHILDREN)
        newNode = h(node, () => patchVModel(node.children.default(), obj, isReadonly))
      if (shapeFlag & ShapeFlags.ARRAY_CHILDREN)
        newNode = h(node, {obj, isReadonly})
      newNode.patchFlag = 0
      return newNode
    }
    if (nodeType === Fragment || (shapeFlag & ShapeFlags.ELEMENT) || (shapeFlag & ShapeFlags.TELEPORT)) {
      node.children = patchVModel(node.children, obj, isReadonly)
    }
    return node
  })
}
