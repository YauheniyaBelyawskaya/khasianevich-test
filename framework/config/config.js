import { randomInt } from 'node:crypto'

const id = randomInt(1000, 10000)
const userName = `yauheniya${id}`

export const config = {
  baseURL: 'https://bookstore.demoqa.com',
  credentials: {
    userName: userName,
    password: 'Yauheniya325!'
  }
}
