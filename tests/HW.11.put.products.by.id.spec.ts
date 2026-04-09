import { expect, test } from '@playwright/test'
import { ProductDto } from '../dto/product.dto'
//import { StatusCodes } from 'http-status-codes' //эта строка не работает.

test.describe('Put/products update product with correct api key', () => {
  const baseEndPointURL = 'https://backend.tallinn-learning.ee/products'
  const apiKey = { 'X-API-Key': 'my-secret-api-key' }
  test('update product  with correct id', async ({ request }) => {
    const requestBody = {
      id: 0,
      name: 'Elena',
      price: 5,
      createdAt: null,
    }
    const response = await request.put(`${baseEndPointURL}/124`, {
      data: requestBody,
      headers: apiKey,
    })

    const responseBody: ProductDto = await response.json()
    const statusCode = response.status()
    console.log('responseBody:', responseBody)
    expect(statusCode).toBe(200)
  })
  test('update product  with incorrect id', async ({ request }) => {
    const requestBody = {
      id: 0,
      name: 'Alena',
      price: 6,
      createdAt: null,
    }
    const response = await request.put(`${baseEndPointURL}/abc`, {
      data: requestBody,
      headers: apiKey,
    })

    const responseBody: ProductDto = await response.json()
    const statusCode = response.status()
    console.log('responseBody:', responseBody)
    expect(statusCode).toBe(400)
  })
})
