describe('User creation', () => {
  it('Success login', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'yauheniya45368734',
        password: 'Yauheniya325!',
        expiresInMins: 30
      })
    })
    const data = await response.json()
    console.log(data)
    expect(response.status).toEqual(201)
    expect(data.username).toBe('yauheniya45368734')
  })
})

describe('User Creation, user name is used', () => {
  it('User name is used', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'yauheniya4536873',
        password: 'Yauheniya325!',
        expiresInMins: 30
      })
    })
    const data = await response.json()
    console.log(data)
    expect(response.status).toEqual(406)
    expect(data).toHaveProperty('code', '1204')
    expect(data).toHaveProperty('message', 'User exists!')
  })
})

describe('User creation, password is not valid', () => {
  it('password is not valid', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'yauheniya4536873',
        password: 'yauheniya325!',
        expiresInMins: 30
      })
    })
    const data = await response.json()
    console.log(data)
    expect(response.status).toEqual(400)
    expect(data).toHaveProperty('code', '1300')
    expect(data).toHaveProperty(
      'message',
      `Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.`
    )
  })
})

describe('Token generation successefull', () => {
  it('Success login', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'yauheniya4536873',
        password: 'Yauheniya325!',
        expiresInMins: 30
      })
    })
    const data = await response.json()
    console.log(data)
    expect(response.status).toEqual(200)
    expect(data).toHaveProperty('status', 'Success')
    expect(data).toHaveProperty('result', 'User authorized successfully.')
  })
})

describe('Token generation with error', () => {
  it('user name error', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'yauheniya',
        password: 'Yauheniya325!',
        expiresInMins: 30
      })
    })
    const data = await response.json()
    console.log(data)
    expect(response.status).toEqual(200)
    expect(data).toHaveProperty('status', 'Failed')
    expect(data).toHaveProperty('result', 'User authorization failed.')
    expect(data).toHaveProperty('token', null)
    expect(data).toHaveProperty('expires', null)
  })
})
