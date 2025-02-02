import { forwardRef, Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { UsersModule } from '../users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
