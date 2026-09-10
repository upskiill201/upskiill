import { IsIn } from 'class-validator';

/**
 * Path params for POST /api/v2/monthly-quest/:milestoneId/claim.
 * The global ValidationPipe (whitelist + forbidNonWhitelisted) validates this.
 */
export class MilestoneParamsDto {
  @IsIn(['M1', 'M2', 'FINAL'], {
    message: 'milestoneId must be one of M1, M2, FINAL',
  })
  milestoneId!: 'M1' | 'M2' | 'FINAL';
}
