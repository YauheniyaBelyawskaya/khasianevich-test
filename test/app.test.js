//export const nameIsValid = name => typeof name === 'string' && name.length >= 2 && /^[a-z]+$/.test(name)

import { nameIsValid } from '../src/app.js'
describe('nameIsValid', () => {
  it('should return true if length >= 2 & lowercase letters', () => {
    expect(nameIsValid('yauheniya')).toBe(true)
  })

  it('should return false if length < 2', () => {
    expect(nameIsValid('a')).toBe(false)
  })

  it('should return false if name consists uppercase letters', () => {
    expect(nameIsValid('Yauheniya')).toBe(false)
  })
})

//export const fullTrim = text => (text ?? '').replace(/\s+/g, '')

import { fullTrim } from '../src/app.js'

describe('fullTrim', () => {
  test.each([
    [' yauheniya khasianevich ', 'yauheniyakhasianevich'], //spaces
    ['    yauheniya', 'yauheniya'], // tabulation
    ['', ''], //null
    [null, ''] //empty row
  ])('check text', (text, expected) => {
    expect(fullTrim(text)).toBe(expected)
  })
})

import { getTotal } from '../src/app.js'
describe('check error1', () => {
  it('Процент скидки должен быть от 0 до 99', () => {
    const items = [{ price: 10, quantity: 10 }]
    expect(() => getTotal(items, -1)).toThrow('Процент скидки должен быть от 0 до 99')
  })
})
describe('check error2', () => {
  it('Процент скидки должен быть от 0 до 99', () => {
    const items = [{ price: 10, quantity: 10 }]
    expect(() => getTotal(items, 101)).toThrow('Процент скидки должен быть от 0 до 99')
  })
})
describe('check error3', () => {
  it('Скидка должна быть числом', () => {
    const items = [{ price: 10, quantity: 10 }]
    expect(() => getTotal(items, 'a')).toThrow('Скидка должна быть числом')
  })
})

describe('getTotal', () => {
  it('скидкf должен быть от 0 до 99', () => {
    const items = [{ price: 10, quantity: 10 }]
    expect(getTotal(items, 10)).toBe(90)
  })
})
