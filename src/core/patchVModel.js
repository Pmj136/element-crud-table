import {type} from "../util";
import {h} from "vue";

export default function patchVModel(vNodes, obj, isReadonly = false) {
  if (!vNodes) return null
  return vNodes.map(node => {
    const nodeType = node.type
    if (type(nodeType) !== 'object') return null
    if (nodeType.name !== "ElFormItem") {
      return patchVModel(node.children, obj, isReadonly)
    }
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
  })
}
