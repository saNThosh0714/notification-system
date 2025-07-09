import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Post()
  async create(@Body() body: { title: string; message: string }) {
    return this.service.createNotification(body.title, body.message);
  }

  @Get()
  async findAll() {
    return this.service.getAllNotifications();
  }
}
