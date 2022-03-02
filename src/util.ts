import { ElMessage, ElMessageBox } from 'element-plus'
import { TYPE_ADD, TYPE_EDIT, TYPE_PREVIEW } from './token'
import { FuncAskOpt, RequestOpt } from './types'

export const isDev = process.env.NODE_ENV === 'development'

function obj2String(obj: Record<string, any>) {
  let arr: any[] = [], idx: number = 0
  for (let item in obj) {
    arr[idx++] = [item, obj[item]]
  }
  return new URLSearchParams(arr).toString()
}

export async function _request({url, method = 'GET', data, params}: RequestOpt) {
  try {
    let reqUrl = url
    if (params) reqUrl = reqUrl + '?' + obj2String(params)
    const resp = await fetch(reqUrl, {
      method,
      body: data
    })
    return resp.json()
  } catch (e) {
    return Promise.reject(e)
  }
}


export function type(o: any) {
  return (Object.prototype.toString.call(o).match(/\[object (.*?)\]/)!)[1].toLowerCase()
}

export function formatData(raw: Record<string, any>, formatter: any, delOldPro = false) {
  const newData = {...raw}
  if (!formatter) return newData
  if (type(formatter) === 'object') {
    for (const prop in formatter) {
      if (newData[prop]) {
        Object.assign(newData, formatter[prop](newData[prop]))
        if (delOldPro) delete newData[prop]
      }
    }
  }
  if (type(formatter) === 'function') {
    formatter(newData)
  }
  return newData
}

export function func_ask_for({
                               type = 'warning',
                               title = '此操作将永久删除该记录, 是否继续？',
                               loadingText = '正在删除',
                               successTip,
                               ...reqEntity
                             }: Partial<FuncAskOpt>, request: Function) {
  return new Promise(resolve => {
    ElMessageBox
      .confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type,
        draggable: true,
        roundButton: true,
        beforeClose: async (action, instance, done) => {
          if (action === 'cancel') {
            done()
          }
          else {
            try {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = loadingText
              const res = await request(reqEntity)
              ElMessage.success(successTip || res.msg)
              done()
            } catch (e) {
              instance.confirmButtonText = '重试'
              console.log(e)
            } finally {
              instance.confirmButtonLoading = false
            }
          }
        }
      })
      .then(resolve)
      .catch(e => e)
  })
}

export function combineUrl(baseUrl: string, path: string) {
  if (baseUrl.endsWith('/')) return baseUrl + path
  return baseUrl + '/' + path
}

export function checkUnSetUrlErrLog(type: string, url?: string) {
  if (type === TYPE_PREVIEW) return
  if (!url) {
    if (type === 'list') {
      console.error(`请设置【crud-table-data】组件的 url 接口地址`)
      return
    }
    let comp = 'crud-table-handler-del'
    if (type === TYPE_EDIT) comp = 'crud-table-handler-edit'
    if (type === TYPE_ADD) comp = 'crud-table-action-add'
    console.error(`请设置【${ comp }】组件的 url 接口地址`)
  }
}

export function checkCompUsePosition(flag: boolean, compName: string, rightPosition: string) {
  if (!flag) {
    console.error(`${ compName } 只能在【${ rightPosition }】中使用`)
  }
}
