import type { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon'
import Fetch from './'
import { expect } from 'chai'
import { useFakeXMLHttpRequest } from 'sinon'

describe('Fetch', () => {
  let xhr: SinonFakeXMLHttpRequestStatic
  let instance: Fetch
  const requests: SinonFakeXMLHttpRequest[] = []

  beforeEach(() => {
    xhr = useFakeXMLHttpRequest()

    global.XMLHttpRequest = xhr

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request)
    }

    instance = new Fetch('/auth')
  })

  afterEach(() => {
    requests.length = 0
  })

  it('.get() should send GET request', () => {
    instance.get('/user')

    const [request] = requests

    expect(request.method).to.eq('Get')
  })
})
