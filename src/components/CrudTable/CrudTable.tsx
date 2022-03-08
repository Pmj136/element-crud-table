import { defineComponent, onMounted, onUnmounted, provide } from 'vue'
import { PJ_DISPATCH_EVENT, PJ_SET_EVENT, PJ_SET_EXPOSE_EVENT } from '../../token'
import { DispatchEventCallback, SetEventCallback } from '../../types'
import './index.css'

type Events = Record<string, Function> | null

export default defineComponent({
  name: 'CrudTable',
  props: {
    gap: {
      type: Number,
      default: 0
    }
  },
  setup({gap}, {slots, emit, expose}) {
    let events: Events = Object.create(null)
    let eventsExpose = Object.create(events)
    provide<SetEventCallback>(PJ_SET_EVENT, (eventObj) => {
      events || (events = {})
      Object.assign(events, eventObj)
    })
    provide<SetEventCallback>(PJ_SET_EXPOSE_EVENT, (eventObj) => {
      eventsExpose || (eventsExpose = {})
      Object.assign(eventsExpose, eventObj)
    })
    provide<DispatchEventCallback>(PJ_DISPATCH_EVENT, (eventName, ...args) => {
      const event = eventsExpose![eventName]
      event?.(...args)
    })
    onUnmounted(() => {
      events = null
      eventsExpose = null
    })
    onMounted(() => {
      emit('ready', eventsExpose)
    })
    expose(eventsExpose)
    return () => (
      <div class="crud-table" style={ {'row-gap': gap + 'px'} }>
        { slots.default?.() }
      </div>
    )
  }
})
