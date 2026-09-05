import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ShopService } from './shop.service';
import { EquipDto, MarkUnlocksSeenDto, PurchaseDto } from './dto/shop.dto';

/**
 * Shop routes.
 *
 * Path note: mounted at the unversioned root to match the modules already
 * live in production (`/auth`, `/courses`, `/chest`). CLAUDE.md §5 records the
 * conscious deviation and tracks the `/api/v1` migration as a follow-up — a
 * second convention here would make that migration harder, not easier.
 */
@Controller('shop')
@UseGuards(AuthGuard('jwt'))
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  /** The whole shop, personalised: stock, prices, locks, goals, recommendations. */
  @Get()
  async getShop(
    @Req() req: any,
    @Query('timezoneOffset') timezoneOffset?: string,
  ) {
    const offset = Number.isFinite(Number(timezoneOffset))
      ? Number(timezoneOffset)
      : 0;
    return this.shopService.getCatalog(req.user.id, offset);
  }

  /** Owned items, equipped loadout and any running boosts. */
  @Get('inventory')
  async getInventory(@Req() req: any) {
    return this.shopService.getInventory(req.user.id);
  }

  /** Equipped cosmetics only — the cheap read the profile renders from. */
  @Get('loadout')
  async getLoadout(@Req() req: any) {
    return this.shopService.getLoadout(req.user.id);
  }

  /** Another learner's equipped cosmetics — cosmetics are meant to be seen. */
  @Get('loadout/:userId')
  async getLoadoutFor(@Param('userId') userId: string) {
    return this.shopService.getLoadout(userId);
  }

  /** Items whose requirement was just met and that the engine has not shown. */
  @Get('unlocks/pending')
  async getPendingUnlocks(@Req() req: any) {
    return this.shopService.getPendingUnlocks(req.user.id);
  }

  @Post('unlocks/seen')
  async markUnlocksSeen(@Req() req: any, @Body() dto: MarkUnlocksSeenDto) {
    return this.shopService.markUnlocksSeen(req.user.id, dto.itemIds);
  }

  @Post('purchase')
  async purchase(@Req() req: any, @Body() dto: PurchaseDto) {
    // `item` is the original client's field name; `itemId` is what the new
    // shop sends. Accepting both keeps a cached bundle working mid-deploy.
    const itemId = dto.itemId ?? dto.item;
    if (!itemId) {
      throw new BadRequestException('Item id is required for purchase.');
    }
    return this.shopService.purchase(req.user.id, itemId, dto.idempotencyKey);
  }

  /** Buy and open a Mystery Chest in one call — the reveal needs both halves. */
  @Post('chest/open')
  async openChest(@Req() req: any, @Body() dto: PurchaseDto) {
    const itemId = dto.itemId ?? dto.item;
    if (!itemId) {
      throw new BadRequestException('Chest id is required.');
    }
    return this.shopService.openChest(req.user.id, itemId, dto.idempotencyKey);
  }

  @Post('equip')
  async equip(@Req() req: any, @Body() dto: EquipDto) {
    return this.shopService.equip(req.user.id, dto.itemId, dto.equipped);
  }

  @Post('collections/:collectionId/claim')
  async claimCollection(
    @Req() req: any,
    @Param('collectionId') collectionId: string,
  ) {
    return this.shopService.claimCollection(req.user.id, collectionId);
  }

  /** Daily visit bonus — paid at most once per learner-local day. */
  @Post('visit')
  async registerVisit(
    @Req() req: any,
    @Query('timezoneOffset') timezoneOffset?: string,
  ) {
    const offset = Number.isFinite(Number(timezoneOffset))
      ? Number(timezoneOffset)
      : 0;
    return this.shopService.registerVisit(req.user.id, offset);
  }
}
