import { expect, test } from '@playwright/test'

//import { StatusCodes } from 'http-status-codes' //эта строка не работает.
//1) Вроде как можно и без нее здесь обойтись? 2) Как сделать, чтоб работала ?:)

test('get order with incorrect id=0 should receive code 400', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/0')
  const responseBody = await response.json()
  const statusCode = response.status()
  console.log('response body:', responseBody)
  expect(statusCode).toBe(400)
  });

test('get order with incorrect id=11 should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/11')
  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()
  console.log('response body:', responseBody)
  // Check if the response status is 200
  expect(statusCode).toBe(400)
});

test('get order with incorrect id=ABCD should receive code 400', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/ABCD')
  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()
  console.log('response body:', responseBody)
  expect(statusCode).toBe(400) // тело ответа отличается от документации
  //здесь я в квери отправила буквы, хотя в требованиях к полю айди стоит интеджер.
  //И тест выдает ошибку 400, что вроде логично.
  // Здесь вопрос. Как в квери параметрах корректно передать строку/ число.
  //Потому что в следующем тесте вышло наоборот. В поле юзернэйм требуется строка,
  //я передаю числа, а тест не выдает ошибку 400, а наоборот говорит,
  // что должно быть 200..
  //Вот в этом тесте
  //HW № 10.get.test-orders{u.name,passw.}.spec.ts
  // test('get order with incorrect name & correct password  should receive code 400')
});

test('get order with incorrect id=" " should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/')
  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()
  console.log('response body:', responseBody)
  expect(statusCode).toBe(400)
}); //Тест упал: Expected: 400, Received: 500

test('get order with incorrect id= symbols "[]{}@£=" should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/"[]{}@£="')
  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()
  console.log('response body:', responseBody)
  // Check if the response status is 200
  expect(statusCode).toBe(400) // тело ответа отличается от документации
}) //Тест упал: SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON
