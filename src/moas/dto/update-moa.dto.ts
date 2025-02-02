import { PartialType } from '@nestjs/mapped-types';
import { CreateMoaDto } from './create-moa.dto';

export class UpdateMoaDto extends PartialType(CreateMoaDto) {}
