import { expect, test } from '@playwright/test'
import { loginDTO, LoginSchema } from '../src/dto/loginDTO'
import { z } from 'zod'
test.describe('login api tests', () => {
  const baseEndPointURL = 'https://backend.tallinn-learning.ee/login/student'

  test('incorrect login', async ({ request }) => {
    const loginResponse = await request.post(baseEndPointURL, {
      data: loginDTO.generateIncorrectPair(),
    })
    expect(loginResponse.status()).toBe(401)
  })

  test('correct login', async ({ request }) => {
    console.log(loginDTO.generateCorrectPair())
    const loginResponse = await request.post(baseEndPointURL, {
      data: loginDTO.generateCorrectPair(),
    })

    // const TestLoginSchema=z.string()
    const token: z.infer<typeof LoginSchema> = await loginResponse.text()
    const TestToken=LoginSchema.parse(token)
    console.log(TestToken)
    expect(loginResponse.status()).toBe(200)
    expect(token.length).toBeGreaterThan(0)
  })
})
