import { forwardRef, Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { UsersModule } from '../users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
