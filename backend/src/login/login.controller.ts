import { Controller, Headers, Post, Body } from '@nestjs/common'
import { LoginService } from './login.service'

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(
    @Headers('accept-language') lang: string,
    @Headers('authorization') accessToken: string,
    @Body('username') username: string,
    @Body('code') code: string
  ): Promise<unknown> {
    return this.loginService.login(lang, accessToken, username, code)
  }
}
