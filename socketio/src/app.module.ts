import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationGateway } from './notification.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationModule } from './notification.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/notificationdb'),
    NotificationModule,ProjectModule,UserModule],
  controllers: [AppController],
  providers: [AppService, NotificationGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('Users/login') // Public route
      .forRoutes('*');       // All other routes will use the middleware
  }
}
