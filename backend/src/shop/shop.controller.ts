import { Controller, Post, Body, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { ShopService } from './shop.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('shop')
@UseGuards(AuthGuard('jwt'))
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post('purchase')
  async purchaseItem(
    @Req() req: any,
    @Body('item') item: string,
  ) {
    const userId = req.user.id;
    if (!item) {
      throw new BadRequestException('Item key is required for purchase.');
    }
    return this.shopService.purchaseItem(userId, item);
  }
}
