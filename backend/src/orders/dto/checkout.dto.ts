import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CheckoutDto {
  @IsArray()
  @IsString({ each: true })
  courseIds: string[];

  // For Guest Checkout
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  fullName?: string;
}
