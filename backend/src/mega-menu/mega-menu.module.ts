import { Module } from '@nestjs/common'
import { MegaMenuService } from './mega-menu.service'
import { MegaMenuController } from './mega-menu.controller'

@Module({
  controllers: [MegaMenuController],
  providers: [MegaMenuService],
})
export class MegaMenuModule {}
