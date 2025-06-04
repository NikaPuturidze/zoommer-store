import { Controller, Get, Headers } from '@nestjs/common'
import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  megaMenu(@Headers('accept-language') lang: string, @Headers('authorization') accessToken: string): Promise<unknown> {
    return this.profileService.profile(lang, accessToken)
  }
}
