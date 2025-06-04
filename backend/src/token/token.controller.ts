import { Controller, Headers, Post, Body } from '@nestjs/common'
import { TokenService } from './token.service'

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  token(
    @Headers('accept-language') lang: string,
    @Headers('authorization') accessToken: string,
    @Body() body: { email: string; password: string }
  ): Promise<unknown> {
    return this.tokenService.token(lang, accessToken, body.email, body.password)
  }
}
