import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
     JwtModule.register({
      secret: 'SAN', // move to ENV in production
      signOptions: { expiresIn: '1h' }
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
