import { expect } from 'chai'
import { isEqual } from './isEqual'

describe('is equal', () => {
  const lhs = {
    name: 'Alex',
    lastname: 'Turner',
    phone: '1982741432',
    friends: ['Michel', 'Tommy', 'Andy'],
  }

  const rhs = {
    name: 'Tommy',
    lastname: 'hilfiger',
    phone: '917836124',
    friends: ['Michel', 'Alex', 'Andy', 'Elsa', 'Simon'],
    profession: 'Designer',
  }

  it('should return false if objects keys length does not match ', () => {
    const result = isEqual(lhs, rhs)

    expect(result).to.eq(false)
  })

  it('should return true if objects is match', () => {
    const result = isEqual(lhs, lhs)

    expect(result).to.eq(true)
  })
})
