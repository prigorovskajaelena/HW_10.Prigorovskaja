

export class loginDTO {
  username: string
  password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
  static generateIncorrectPair(): loginDTO {
    return new loginDTO('', '')
  }

  static generateCorrectPair(): loginDTO {
    return new loginDTO(
      process.env.USER || 'missing USER env var',
      process.env.PASSWORD || 'missing PASSWORD env var',
    )
  }
}