import { config } from '../framework/config/config'

describe('Get user info', () => {
  let userId
  let token

  beforeAll(async () => {
    // Create user
    const createResponse = await fetch(`${config.baseURL}/Account/v1/User`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: config.credentials.userName,
        password: config.credentials.password
      })
    })
    const { userID } = await createResponse.json()
    userId = userID

    // Generate token
    const tokenResponse = await fetch(`${config.baseURL}/Account/v1/GenerateToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: config.credentials.userName,
        password: config.credentials.password
      })
    })
    const tokenData = await tokenResponse.json()
    token = tokenData.token

    // Authorization
    const loginResponse = await fetch(`${config.baseURL}/Account/v1/Authorized`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: config.credentials.userName,
        password: config.credentials.password
      })
    })

    const loginSuccess = await loginResponse.text()
    console.log('Authorization success:', loginSuccess) // будет 'true' или 'false'
  })

  it('should get info successfully', async () => {
    const response = await fetch(`${config.baseURL}/Account/v1/User/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        body: JSON.stringify({
          userName: config.credentials.userName,
          password: config.credentials.password
        })
      }
    })
    const data = await response.json()
    console.log(data.books)
    expect(response.status).toBe(200)
    expect(Array.isArray(data.books)).toBe(true)
  })
})

describe('User deletion', () => {
  let userId
  let token

  beforeAll(async () => {
    // Create user
    const createResponse = await fetch(`${config.baseURL}/Account/v1/User`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: config.credentials.userName,
        password: config.credentials.password
      })
    })
    const { userID } = await createResponse.json()
    userId = userID

    // Generate token
    const tokenResponse = await fetch(`${config.baseURL}/Account/v1/GenerateToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: config.credentials.userName,
        password: config.credentials.password
      })
    })
    const tokenData = await tokenResponse.json()
    token = tokenData.token

    // Authorization
    const loginResponse = await fetch(`${config.baseURL}/Account/v1/Authorized`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: config.credentials.userName,
        password: config.credentials.password
      })
    })

    const loginSuccess = await loginResponse.text()
    console.log('Authorization success:', loginSuccess) // будет 'true' или 'false'
  })

  it('should delete the user successfully', async () => {
    const response = await fetch(`${config.baseURL}/Account/v1/User/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    expect(response.status).toBe(200)
  })
})

describe('User creation', () => {
  it('User is created', async () => {
    const uniqueUserName = `${config.credentials.userName}_${Date.now()}`
    const response = await fetch(`${config.baseURL}/Account/v1/User`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: uniqueUserName,
        password: config.credentials.password
      })
    })

    const data = await response.json()
    console.log('Status:', response.status)
    console.log('Response data:', data)

    expect(response.status).toEqual(201)
    expect(data.username).toBe(uniqueUserName)
  })
})
