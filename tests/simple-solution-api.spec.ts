import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { OrderDTO, OrderSchema } from '../src/dto/orderDTO'
import { Login, loginDTO } from '../src/dto/loginDTO'
import { getJwt } from '../src/helpers/api-helper'
 const ORDERS_URL='https://backend.tallinn-learning.ee/orders'
 const AUTH_URL = 'https://backend.tallinn-learning.ee/login/student'

test('post order with correct data should receive code 201', async ({ request }) => {
  // prepare request body
  // Send a POST request to the server

  const token=getJwt(request)
  console.log('token'+token)
  const response = await request.post(ORDERS_URL, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    data: OrderDTO.generateDefault(),
  })
  // parse raw response body to json
  const responseBody= await response.json()
  //const responseBody: OrderDTO = await response.text()
  const statusCode = response.status()

  // Log the response status and body
  console.log('response status:', statusCode)
  console.log('response body:', responseBody)
  expect(statusCode).toBe(StatusCodes.OK)
  const TestOrder=OrderSchema.parse(responseBody)


  expect(TestOrder.id).not.toBeUndefined()
  // check that body.courierId is number type
  ///expect(typeof responseBody.courierId).toBe('number')
})


test('get order with correct id should receive code 200', async ({ request }) => {

  const loginResponse = await request.post(AUTH_URL, {
    data: loginDTO.generateCorrectPair(),
  })
  const token: Login = await loginResponse.text()
  //console.log(token)
  const response = await request.post(ORDERS_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: OrderDTO.generateDefault(),
  })
  // parse raw response body to json
  const responseBody = await response.json()
  //const responseBody: OrderDTO = await response.text()
  //const statusCode = response.status()


  // Build and send a GET request to the server
  const responseSearch = await request.get(`${ORDERS_URL}/${responseBody.id}`, {
    headers : {
    "Authorization": `Bearer ${token}`
  }
  })

  // parse raw response body to json
  const responseBodySearch: OrderDTO = await responseSearch.json()
  const statusCode = responseSearch.status()

  // Log the response status, body and headers
  //console.log('response body:', responseBodySearch)
  // Check if the response status is 200
  expect(statusCode).toBe(200)
  const testSearchOrder=OrderSchema.parse(responseBodySearch)
expect (testSearchOrder.id).not.toBeUndefined()
})


