import { Module } from '@nestjs/common';
import { MoasService } from './moas.service';
import { MoasController } from './moas.controller';

@Module({
  controllers: [MoasController],
  providers: [MoasService],
})
export class MoasModule {}
