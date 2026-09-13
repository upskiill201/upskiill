import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccessPlan, CouponDiscountType, Role } from '@prisma/client';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { CouponsService } from './coupons.service';

/**
 * Creator-facing Coupons CRUD. Ownership is derived from the authenticated
 * request user (req.user.id) exclusively — never from a body field, mirroring
 * every other creator-owned-resource controller (see CourseController).
 */
@Roles(Role.INSTRUCTOR, Role.ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('coupons')
export class CouponsController {
  constructor(private readonly coupons: CouponsService) {}

  @Post()
  create(
    @Req() req: any,
    @Body()
    body: {
      code: string;
      internalName?: string;
      discountType: CouponDiscountType;
      discountValue: number;
      courseIds: string[];
      plans: AccessPlan[];
      startsAt?: string;
      expiresAt?: string | null;
      maxRedemptions?: number | null;
    },
  ) {
    return this.coupons.create(req.user.id as string, {
      ...body,
      startsAt: body.startsAt ? new Date(body.startsAt) : undefined,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : body.expiresAt === null ? null : undefined,
    });
  }

  @Get()
  list(@Req() req: any, @Query() query: { state?: string; courseId?: string }) {
    return this.coupons.listMine(req.user.id as string, query);
  }

  @Get(':id')
  get(@Req() req: any, @Param('id') id: string) {
    return this.coupons.getMine(req.user.id as string, id);
  }

  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body()
    body: {
      internalName?: string;
      discountType?: CouponDiscountType;
      discountValue?: number;
      courseIds?: string[];
      plans?: AccessPlan[];
      startsAt?: string;
      expiresAt?: string | null;
      maxRedemptions?: number | null;
    },
  ) {
    return this.coupons.update(req.user.id as string, id, {
      ...body,
      startsAt: body.startsAt ? new Date(body.startsAt) : undefined,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : body.expiresAt === null ? null : undefined,
    });
  }

  @Post(':id/pause')
  pause(@Req() req: any, @Param('id') id: string) {
    return this.coupons.pause(req.user.id as string, id);
  }

  @Post(':id/resume')
  resume(@Req() req: any, @Param('id') id: string) {
    return this.coupons.resume(req.user.id as string, id);
  }

  @Post(':id/archive')
  archive(@Req() req: any, @Param('id') id: string) {
    return this.coupons.archive(req.user.id as string, id);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.coupons.remove(req.user.id as string, id);
  }
}
