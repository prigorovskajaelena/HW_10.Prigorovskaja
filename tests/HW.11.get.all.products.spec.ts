import { expect, test } from '@playwright/test'
import { ProductDto } from '../dto/product.dto'

//import { StatusCodes } from 'http-status-codes' //эта строка не работает.

test.describe ('Get/products', () => {
  const baseEndPointURL = 'https://backend.tallinn-learning.ee/products'

  test('GET/orders -check API returns array with length >=1', async ({ request }) => {
    const apiKey = { 'X-API-Key': 'my-secret-api-key' }
    const response = await request.get(baseEndPointURL, {
      headers: apiKey
    })

    const responseBody: ProductDto [] = await response.json()
    const statusCode = response.status()
    console.log(responseBody.length)
    expect(statusCode).toBe(200)
    expect(responseBody.length).toBeDefined()
    expect(responseBody.length).toBeGreaterThanOrEqual(1)
  })

  test('GET/orders with invalid apiKey', async ({ request }) => {
    const response = await request.get(baseEndPointURL, {
      headers:  {'X-API-Key': ' '}
    })

    const responseBody: ProductDto [] = await response.json()
    const statusCode = response.status()
    console.log('response body:', responseBody)
   expect(statusCode).toBe(400)
    //тест упал:
    //Expected: 400
    // Received: 401
  //   Как получить код 400, если мы ничего, кроме
  //   апи кей не передаем в гет запросе?
  })
  })
