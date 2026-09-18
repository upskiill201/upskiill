import { IsString, MinLength } from 'class-validator';

export class CreateCourseImportDto {
  @IsString()
  @MinLength(1)
  driveFolderId: string;
}
