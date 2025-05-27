import { Controller, Get, Headers } from '@nestjs/common'
import { MegaMenuService } from './mega-menu.service'

@Controller('mega-menu')
export class MegaMenuController {
  constructor(private readonly megaMenuService: MegaMenuService) {}

  @Get()
  megaMenu(@Headers('accept-language') lang: string, @Headers('authorization') accessToken: string): Promise<unknown> {
    return this.megaMenuService.megaMenu(lang, accessToken)
  }
}
