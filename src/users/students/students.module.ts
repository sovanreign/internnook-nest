import { forwardRef, Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { UsersModule } from '../users.module';
import { CoordinatorsModule } from '../coordinators/coordinators.module';

@Module({
  imports: [forwardRef(() => UsersModule), CoordinatorsModule],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
