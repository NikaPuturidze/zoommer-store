import { Controller, Post, Headers, Body } from '@nestjs/common'
import { RenewService } from './renew.service'

@Controller('renew')
export class RenewController {
  constructor(private readonly renewService: RenewService) {}

  @Post()
  renew(
    @Headers('accept-language') lang: string,
    @Headers('authorization') accessToken: string,
    @Body('citizenOfAnotherCountry') citizenOfAnotherCountry: string,
    @Body('email') email: string,
    @Body('lastName') lastName: string,
    @Body('name') name: string,
    @Body('personalNumber') personalNumber: string
  ): Promise<unknown> {
    return this.renewService.renew(lang, accessToken, citizenOfAnotherCountry, email, lastName, name, personalNumber)
  }
}
