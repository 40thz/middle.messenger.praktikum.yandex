import Component from './'
import { expect } from 'chai'
import { fake } from 'sinon'

const eventBusMock = {
  on: fake(),
  emit: fake(),
}

describe('Component', () => {
  class ComponentMock extends Component {}

  it('should fire init event on initialization', () => {
    new ComponentMock()

    expect(eventBusMock.emit.calledWith('init')).to.eq(false)
  })
})
