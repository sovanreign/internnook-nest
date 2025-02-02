import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CompaniesModule } from './companies/companies.module';
import { StudentsModule } from './students/students.module';
import { CoordinatorsModule } from './coordinators/coordinators.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [CompaniesModule, StudentsModule, CoordinatorsModule],
})
export class UsersModule {}
