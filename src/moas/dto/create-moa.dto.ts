import { MoaStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class CreateMoaDto {
  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @IsInt()
  @IsNotEmpty()
  coordinatorId: number;

  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @IsInt()
  @IsNotEmpty()
  applicationId: number;

  @IsBoolean()
  @IsOptional()
  studentSigned: boolean;

  @IsBoolean()
  @IsOptional()
  coordinatorSigned: boolean;

  @IsBoolean()
  @IsOptional()
  companySigned: boolean;

  @IsEnum(MoaStatus)
  @IsOptional()
  status: MoaStatus;

  @IsOptional()
  studentSlug?: string;

  @IsOptional()
  coordinatorSlug?: string;

  @IsOptional()
  companySlug?: string;
}

export class CreateMoaBulkDto {
  @ValidateNested({ each: true })
  @Type(() => CreateMoaDto)
  @IsNotEmpty()
  data: CreateMoaDto[];
}
