import { expect, test } from '@playwright/test'

test.describe('Delete/products with correct api key', () => {
  const baseEndPointURL = 'https://backend.tallinn-learning.ee/products'
  const apiKey = { 'X-API-Key': 'my-secret-api-key' }
  //   можно удалить продукт 1029
  test('delete product with correct id  should receive code 204', async ({ request }) => {
    const response = await request.delete(`${baseEndPointURL}/1135`, {
      headers: apiKey,
    })
    expect(response.status()).toBe(204)
  })

  test('delete product with incorrect id  should receive code 400', async ({ request }) => {
    const response = await request.delete(`${baseEndPointURL}/123`, {
      headers: apiKey,
    })
    expect(response.status()).toBe(400)
  })
})
