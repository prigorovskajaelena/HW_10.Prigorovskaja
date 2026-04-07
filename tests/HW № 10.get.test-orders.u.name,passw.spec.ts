import { expect, test } from '@playwright/test'

//import { StatusCodes } from 'http-status-codes' //эта строка не работает.
//1) Вроде как можно и без нее здесь обойтись? 2) Как сделать, чтоб работала ?:)

test('get order with correct name&password  should receive code 200',
  async ({ request }) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders/auth?username=elena&password=elena',
  )
  const responseBody = await response.json()
  const statusCode = response.status()
  console.log('response body:', responseBody)
  expect(statusCode).toBe(200)
})

test('get order with incorrect name=123 & correct password  should receive code 400',
  async ({ request }) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders/auth?username=123&password=elena',
  )
  const responseBody = await response.json()
  const statusCode = response.status()
  console.log('response body:', responseBody)
  expect(statusCode).toBe(400)
});

  //тест упал с такой формулировкой :
  // Expected: 400
  // Received: 200. Т.е. в данном случае username=123 тоже "строка"?
  // в сваггере username: string.

test('get order with incorrect name= & correct password  should receive code 400',
  async ({request}) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders/auth?username= &password=elena',
  )
  const responseBody = await response.json()
  const statusCode = response.status()
  console.log('response body:', responseBody)
  expect(statusCode).toBe(400)
})

//тест упал с такой формулировкой :
// Expected: 400
// Received: 200.

test('get order with correct name & incorrect password=£@!$ should receive code 400', async ({
  request,
}) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders/auth?username=elena &password=£@!$',
  )
  const responseBody = await response.json()
  const statusCode = response.status()
  console.log('response body:', responseBody)
  expect(statusCode).toBe(400)
})
//тест упал с такой формулировкой :
// Expected: 400
// Received: 200.

test('get order without name & correct password should receive code 500', async ({
  request,
}) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders/auth?password=elena',
  )
  const responseBody = await response.json()
  const statusCode = response.status()
  console.log('response body:', responseBody)
  expect(statusCode).toBe(500)
})
test('get order with correct name & without password should receive code 500', async ({ request }) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders/auth?name=elena',
  )
  const responseBody = await response.json()
  const statusCode = response.status()
  console.log('response body:', responseBody)
  expect(statusCode).toBe(500)
})