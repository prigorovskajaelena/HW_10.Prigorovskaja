import { expect, test } from '@playwright/test'

test('delete order with correct params  should receive code 204', async ({ request }) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: {
      api_key: '1234567890123456',
    },
  })
  expect(response.status()).toBe(204)
})

test('delete order with api key is missing  should receive code 401', async ({ request }) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/2', {
    headers: {
      api_key: '',
    },
  })
  expect(response.status()).toBe(401)
})

test('delete order with api key is invalid  should receive code 401', async ({ request }) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/2', {
    headers: {
      api_key: 'abcd{£$',
    },
  })
  expect(response.status()).toBe(401)
})

test('delete order with api key is not 16 digits  should receive code 401', async ({ request }) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/3', {
    headers: {
      api_key: '123456789',
    },
  })
  expect(response.status()).toBe(401)
})

// В документации не указано, что надо делать другие проверки, например,
//   негативные проверки, если id код некорректный.
//   Соответственно, мы их и не делаем?
//   А как в реальной жизни? Нужно ли тестировщику быть
//   "бдительным" и делать сверх того, что указано в сваггере.
//   Чтобы предотвратить нежелательное поведение системы.
