import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './app/user.module';
import { UserEntity } from './tools/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_INSTANCE_UNIX_SOCKET, // Cloud SQL instance connection
      port: parseInt(process.env.POSTGRES_DB_PORT, 10),
      username: process.env.POSTGRES_DB_USER,
      password: process.env.POSTGRES_DB_PASS,
      database: process.env.POSTGRES_DB_NAME,
      entities: [UserEntity],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
