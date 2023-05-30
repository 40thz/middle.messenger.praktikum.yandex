import { queryStringify } from '../../utils/queryStringify'

export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete',
}

type Options = {
  method: Method
  contentType?: string
  data?: any
}

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2'
  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`
  }

  public get<Response>(path = '/', data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Get,
      data,
    })
  }

  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Post,
      data,
    })
  }

  public put<Response = void>(path: string, data: unknown, contentType?: string): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Put,
      contentType,
      data,
    })
  }

  public patch<Response = void>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Patch,
      data,
    })
  }

  public delete<Response>(path: string, data: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Delete,
      data,
    })
  }

  private request<Response>(url: string, options: Options = { method: Method.Get }): Promise<Response> {
    const { method, data, contentType } = options
    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'))
        return
      }

      const xhr = new XMLHttpRequest()
      const isGet = method === Method.Get
      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url)

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response)
          } else {
            reject(xhr.response)
          }
        }
      }

      xhr.onabort = () => reject({ reason: 'abort' })
      xhr.onerror = () => reject({ reason: 'network error' })
      xhr.ontimeout = () => reject({ reason: 'timeout' })

      xhr.withCredentials = true
      xhr.responseType = 'json'
      if (contentType === 'FormData') {
        xhr.send(data)
        return
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json')
      }

      if (method === Method.Get || !data) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
