import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { InternshipsModule } from './internships/internships.module';
import { ApplicationsModule } from './applications/applications.module';
import { EsignaturesModule } from './esignatures/esignatures.module';
import { MoasModule } from './moas/moas.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to the uploads directory
      serveRoot: '/uploads',
    }),
    UsersModule,
    AuthModule,
    InternshipsModule,
    ApplicationsModule,
    EsignaturesModule,
    MoasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
