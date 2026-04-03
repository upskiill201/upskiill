import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CheckoutDto } from './dto/checkout.dto';
import { OptionalJwtAuthGuard } from './guards/optional-jwt-auth.guard';
import { GetUser } from '../auth/decorator/get-user.decorator';
import type { User } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  @UseGuards(OptionalJwtAuthGuard)
  async checkout(
    @GetUser() user: User | null,
    @Body() checkoutDto: CheckoutDto,
  ) {
    return this.ordersService.checkout(user ? user.id : null, checkoutDto);
  }

  @Get('my-orders')
  @UseGuards(OptionalJwtAuthGuard) // Can be standard guard too
  async getMyOrders(@GetUser() user: User | null) {
    if (!user) throw new Error('Unauthorized');
    return this.ordersService.getUserOrders(user.id);
  }
}
