import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './notification.schema';
import { Model } from 'mongoose';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    private gateway: NotificationGateway
  ) {}

  async createNotification(title: string, message: string) {
    const notification = await this.notificationModel.create({ title, message });
    this.gateway.sendNotification(notification); // Send to clients via Socket.IO
    // return notification;
  }

  async getAllNotifications() {
    return this.notificationModel.find().sort({ createdAt: -1 }).exec();
  }
}
