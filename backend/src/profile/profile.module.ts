import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService], // Exported so AuthService can call hydrateFromOnboarding
})
export class ProfileModule {}
