import {type} from "../util";
import {h} from "vue";

export default function patchVModel(vNodes, obj, isReadonly = false) {
  if (!vNodes) return null
  return vNodes.map(node => {
    const nodeType = node.type
    if (nodeType.name === "ElFormItem") {
      const {prop, skip} = node.props || {}
      if (skip !== undefined) return node
      if (!prop) console.error("请给 ElFormItem 设置 prop 属性")
      const childrenNode = node.children['default']()
      return h(node, () => childrenNode.map(child => {
        if (isReadonly) {
          return h(child, {
            modelValue: obj[prop],
            readonly: true
          })
        }
        return h(child, {
          modelValue: obj[prop],
          'onUpdate:modelValue': value => {
            obj[prop] = value
          }
        })
      }))
    }
    if (type(nodeType) === 'string') {
      //普通元素
      if (type(node.children) === 'string') return node
      return h(node, patchVModel(node.children, obj, isReadonly))
    }
    return h(node, () => patchVModel(node.children.default(), obj, isReadonly))
  })
}
