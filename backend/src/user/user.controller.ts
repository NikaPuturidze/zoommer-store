import { Controller, Headers, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  user(
    @Headers('accept-language') lang: string,
    @Headers('authorization') accessToken: string,
    @Body('username') username: string
  ): Promise<unknown> {
    return this.userService.user(lang, accessToken, username)
  }
}
