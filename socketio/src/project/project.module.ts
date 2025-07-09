import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './project.schema';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Counter, CounterSchema } from './counter.schema';
import { NotificationModule } from 'src/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema },{ name: Project.name, schema: ProjectSchema }]),
    NotificationModule
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
