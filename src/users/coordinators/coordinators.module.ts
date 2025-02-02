import { forwardRef, Module } from '@nestjs/common';
import { CoordinatorsService } from './coordinators.service';
import { CoordinatorsController } from './coordinators.controller';
import { UsersModule } from '../users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [CoordinatorsController],
  providers: [CoordinatorsService],
  exports: [CoordinatorsService],
})
export class CoordinatorsModule {}
