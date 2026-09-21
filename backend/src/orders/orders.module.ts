import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  // PrismaService deliberately NOT listed — PrismaModule is @Global, so
  // declaring it here would create a second client with its own pool.
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
