import { expect, test } from '@playwright/test'
import { ProductDto } from '../dto/product.dto'
//import { StatusCodes } from 'http-status-codes' //эта строка не работает.

test.describe('Post/products create product with params', () => {
  const baseEndPointURL = 'https://backend.tallinn-learning.ee/products'
  const apiKey = { 'X-API-Key': 'my-secret-api-key' }
  test('create product  with correct id and body', async ({ request }) => {
    const requestBody = {
      id: 0,
      name: 'ElenaP',
      price: 7,
      createdAt: null,
    }
    const response = await request.post(`${baseEndPointURL}`, {
      data: requestBody,
      headers: apiKey,
    })

    const responseBody: ProductDto = await response.json()
    const statusCode = response.status()
    console.log('responseBody:', responseBody)
    expect(statusCode).toBe(200)
  })

  test('create product  with incorrect body', async ({ request }) => {
    const incorrectRequestBody = {
      id: 0,
      name: '',
      price: -10,
      createdAt: null,
    }
    const response = await request.post(`${baseEndPointURL}`, {
      data: incorrectRequestBody,
      headers: apiKey,
    })

    const responseText = await response.text()
    const statusCode = response.status()
    console.log('response text:', responseText)
    expect(statusCode).toBe(400)
  })

  //В сваггере получила такой ответ от сервера,
  // когда сделала некорректный боди:
  // Error: response status is 400
  // Response body
  // Some arguments missed or empty.
  // Так что согласно ответа от сваггера, я получила 400 код.
  //   Как по-другому сделать ошибку 400 не знаю..
})
