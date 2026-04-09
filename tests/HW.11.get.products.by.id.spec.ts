import { expect, test } from '@playwright/test'
import { ProductDto } from '../dto/product.dto'
//import { StatusCodes } from 'http-status-codes' //эта строка не работает.

test.describe('Get/products by id-checks with correct api key', () => {
  const baseEndPointURL = 'https://backend.tallinn-learning.ee/products'
  const apiKey = { 'X-API-Key': 'my-secret-api-key' }
  test('GET/orders  with correct id', async ({ request }) => {
    const response = await request.get(`${baseEndPointURL}/124`, {
      headers: apiKey,
    })

    const responseBody: ProductDto[] = await response.json()
    const statusCode = response.status()
    console.log('responseBody:', responseBody)
    expect(statusCode).toBe(200)
  })

  test('GET/orders with incorrect id', async ({ request }) => {
    const response = await request.get(`${baseEndPointURL}/abc`, {
      headers: apiKey,
    })

    const responseBody: ProductDto[] = await response.json()
    const statusCode = response.status()
    console.log('response body:', responseBody)
    expect(statusCode).toBe(400)
  })
})
