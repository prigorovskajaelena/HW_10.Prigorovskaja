import { loginDTO } from '../dto/loginDTO'
import { APIRequestContext } from 'playwright'
const AUTH_URL = 'https://backend.tallinn-learning.ee/login/student'

export async function getJwt(request:APIRequestContext): Promise <string> {
  const loginResponse = await request.post(AUTH_URL, {
    data: loginDTO.generateCorrectPair(),
  })
 return await loginResponse.text()
}

