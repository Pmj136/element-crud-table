import { Action, ActionSetList, ActionShowDialog } from './token'
import { inject } from 'vue'
import { ShowDialogArgs } from './types'


type DispatchActionArgs = ShowDialogArgs | Record<string, any> | undefined

function useDispatchAction(action: ActionSetList): (value?: unknown) => unknown;
function useDispatchAction(action: ActionSetList, args: Record<string, any>): (value?: unknown) => unknown;
function useDispatchAction(action: ActionShowDialog, args: ShowDialogArgs): (value?: unknown) => unknown;
function useDispatchAction(action: Action, args?: DispatchActionArgs): (value?: unknown) => unknown {
  const dispatch = inject<Function>('emit')
  return () => dispatch!(action, args)
}

export {
  useDispatchAction
}
