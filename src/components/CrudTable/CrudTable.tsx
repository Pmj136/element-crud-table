import { defineComponent, onMounted, onUnmounted, provide } from 'vue'
import './index.css'

type Task = Record<string, Function> | null

export default defineComponent({
  name: 'CrudTable',
  props: {
    gap: {
      type: Number,
      default: 0
    }
  },
  setup({gap}, {slots, emit, expose}) {
    let task: Task = {}
    provide('on', (name: string, fn: Function) => {
      (task || (task = {}))[name] = fn
    })
    provide('emit', (name: string, ...args: any[]) => {
      const fn = task![name]
      if (!fn) {
        console.error('请使用【CrudTableDialog】设置弹窗表单')
        return
      }
      fn(...args)
    })
    onUnmounted(() => {
      task = null
    })
    onMounted(() => {
      emit('ready', task)
    })
    expose(task)
    return () => (
      <div class="crud-table" style={ {'row-gap': gap + 'px'} }>
        { slots.default?.() }
      </div>
    )
  }
})
