import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import emailConfig from './config/emailConfig';
// import { validationSchema } from './config/validationSchema';
import { EmailModule } from './email/email.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig],
      isGlobal: true,
      // validationSchema,
    }),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule {}
