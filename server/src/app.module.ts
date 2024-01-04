import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ProfileSchema } from './schemas/profil.schema';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { MessageSchema } from './schemas/message.schema';
import { MessageController } from './controllers/message.controller';
import { ChatService } from './services/message.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/myapp'),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Profile', schema: ProfileSchema },
      { name: 'Message', schema: MessageSchema }
    ]),
    JwtModule.register({
      secret: process.env.SCREET_KEY,
    }),
  ],
  controllers: [UserController, AuthController, ProfileController, MessageController],
  providers: [UserService, AuthService, ProfileService, ChatService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      'createProfile', 
      'getProfile',
      'updateProfile',
      'sendMessage',
      'viewMessages'
    );
  }
}