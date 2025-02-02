import { Module } from '@nestjs/common';
import { EsignaturesService } from './esignatures.service';
import { EsignaturesController } from './esignatures.controller';

@Module({
  controllers: [EsignaturesController],
  providers: [EsignaturesService],
})
export class EsignaturesModule {}
