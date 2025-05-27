import { Controller, Get } from '@nestjs/common'
import { CookieService } from './cookie.service'
@Controller('cookie')
export class CookieController {
  constructor(private readonly cookieService: CookieService) {}

  @Get()
  async fetchToken(): Promise<{ token: string }> {
    const token = await this.cookieService.getAuthToken()
    return { token }
  }
}
