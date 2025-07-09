import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-screen',
  standalone: true,
  imports: [],
  templateUrl: './notification-screen.component.html',
  styleUrl: './notification-screen.component.scss'
})
export class NotificationScreenComponent {

  notifications: { title: string; message: string }[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe((notification) => {
      this.notifications.unshift(notification); // show latest first
    });
  }

}
