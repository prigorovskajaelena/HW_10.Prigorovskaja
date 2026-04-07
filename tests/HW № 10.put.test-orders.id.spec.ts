import { expect, test } from '@playwright/test'

test.describe('positive checks: update order', () => {
  test('update order with correct id=1 and api_key should receive code 200', async ({
    request,
  }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 1,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
      data: requestBody,
      headers: {
        api_key: '1234567890123456',
      },
    })
    const responseBody = await response.json()
    const statusCode = response.status()
    console.log('response body:', responseBody)
    expect(statusCode).toBe(200)
  })
  test('update order with correct id=2 and api_key should receive code 200', async ({
    request,
  }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 2,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/2', {
      data: requestBody,
      headers: {
        api_key: '1234567890123456',
      },
    })
    const responseBody = await response.json()
    const statusCode = response.status()
    console.log('response body:', responseBody)
    expect(statusCode).toBe(200)
  })
  test('update order with correct id=5 and api_key should receive code 200', async ({
    request,
  }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 5,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/5', {
      data: requestBody,
      headers: {
        api_key: '1234567890123456',
      },
    })
    const responseBody = await response.json()
    const statusCode = response.status()
    console.log('response body:', responseBody)
    expect(statusCode).toBe(200)
  })

  test('update order with correct id=9 and api_key should receive code 200', async ({
    request,
  }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 9,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/9', {
      data: requestBody,
      headers: {
        api_key: '1234567890123456',
      },
    })
    const responseBody = await response.json()
    const statusCode = response.status()
    console.log('response body:', responseBody)
    expect(statusCode).toBe(200)
  })
  test('update order with correct id=10 and api_key should receive code 200', async ({
    request,
  }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 10,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/10', {
      data: requestBody,
      headers: {
        api_key: '1234567890123456',
      },
    })
    const responseBody = await response.json()
    const statusCode = response.status()
    console.log('response body:', responseBody)
    expect(statusCode).toBe(200)
  })
  //можно ли такие проверки (строки 5-114) делать в цикле?
  // Или как можно упростить или сократить этот код?
})
test.describe('negative checks: update order', () => {
  test('update order with api_key is not 16 digits should receive code 401', async ({
    request,
  }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 2,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/2', {
      data: requestBody,
      headers: {
        api_key: '1234567890',
      },
    })
    expect(response.status()).toBe(401)
  })

  test('update order with empty api_key should receive code 401', async ({ request }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 3,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/3', {
      data: requestBody,
      headers: {
        api_key: '',
      },
    })
    expect(response.status()).toBe(401)
  })
  test('update order with api_key is invalid should receive code 401', async ({ request }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 3,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/3', {
      data: requestBody,
      headers: {
        api_key: 'abcd{£$',
      },
    })
    expect(response.status()).toBe(401)
  })

  test('update order with api_key is missing should receive code 401', async ({ request }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 3,
    }
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/3', {
      data: requestBody,
      headers: {
        api_key: '',
      },
    })
    expect(response.status()).toBe(401)
  })
  test('update order if request body is empty should receive code 404', async ({ request }) => {
    const requestBody = {}
    const response = await request.put('https://backend.tallinn-learning.ee/test-orders/3', {
      data: requestBody,
      headers: {
        api_key: '1234567890123456',
      },
    })
    expect(response.status()).toBe(404)
  })
})
//тест упал с формулировкой:
// Expected: 404
// Received: 200
