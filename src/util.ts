import { TYPE_ADD, TYPE_EDIT, TYPE_PREVIEW } from './token'
import { RequestOpt } from './types'

export const isDev = process.env.NODE_ENV !== 'production'

export async function _request({ url, method = 'GET', data, params }: RequestOpt) {
    try {
        let reqUrl = url
        if (params) reqUrl = reqUrl + '?' + new URLSearchParams(Object.entries(params))
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

export function formatData(data: Record<string, any>, formatter: any, delOldPro = false) {
    const raw = { ...data }
    for (const k in raw)
        if (raw[k] === undefined || raw[k] === '')
            delete raw[k]
    if (!formatter) return raw
    if (type(formatter) === 'object') {
        for (const prop in formatter) {
            if (raw[prop]) {
                Object.assign(raw, formatter[prop](raw[prop]))
                if (delOldPro) delete raw[prop]
            }
        }
    }
    if (type(formatter) === 'function') {
        formatter(raw)
    }
    return raw
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
        console.error(`请设置【${comp}】组件的 url 接口地址`)
    }
}

export function checkCompUsePosition(flag: boolean, compName: string, rightPosition: string) {
    if (!flag) {
        console.error(`${compName} 只能在【${rightPosition}】中使用`)
    }
}
