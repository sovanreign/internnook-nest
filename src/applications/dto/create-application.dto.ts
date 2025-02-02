import { ApplicationStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class CreateApplicationDto {
  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @IsInt()
  @IsNotEmpty()
  internshipId: number;

  @IsEnum(ApplicationStatus)
  @IsOptional()
  status: ApplicationStatus;
}

export class CreateApplicationBulkDto {
  @ValidateNested({ each: true })
  @Type(() => CreateApplicationDto)
  @IsNotEmpty()
  data: CreateApplicationDto[];
}
