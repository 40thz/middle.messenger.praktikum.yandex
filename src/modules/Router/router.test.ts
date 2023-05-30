import Component from '../Component'

import Router from './'

import { expect } from 'chai'

import { fake } from 'sinon'

describe('Router', () => {
  const getContentFake = fake.returns(document.createElement('div'))

  const BlockMock = class {
    getContent = getContentFake
  } as typeof Component

  it('use() should return Router instance', () => {
    const result = Router.use({ pathname: '/', component: BlockMock })

    expect(result).to.eq(Router)
  })

  it('should render a page on history back action', () => {
    Router.use({ pathname: '/', component: BlockMock }).start()

    Router.back()

    expect(getContentFake.callCount).to.eq(1)
  })

  it('should render a page on start', () => {
    Router.use({ pathname: '/', component: BlockMock }).start()

    expect(getContentFake.callCount).to.eq(1)
  })

  it('redirect on new page should to have change state essence history', () => {
    window.history.pushState({ page: 'signin' }, 'SignIn', '/signin')
    window.history.pushState({ page: 'signup' }, 'SignUp', '/signup')

    expect(window.history.length).to.eq(3)
  })
})
