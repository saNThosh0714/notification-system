import { AfterViewInit, Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { ProjectService } from '../project.service';
import { AddProjectDialogComponent } from '../dashboard/add-project-dialog.component';
import { SupportModule } from '../support.module';
import { AddUserDialogComponent } from '../UserDashboard/add-user-dialog.component';
import { UserService } from '../user.service';

export interface projectdetails {
  id?: number;
  name?: string;
  description?: string;
}

@Component({
  selector: 'app-Header',
  standalone: true,
  imports: [SupportModule,
    AddProjectDialogComponent, AddUserDialogComponent],
  templateUrl: './Header.component.html',
  styleUrl: './Header.component.scss'
})
export class HeaderComponent implements AfterViewInit {

  notifications: { title: string; message: string }[] = [];

  @Input() pageTitle: string = '';
  @Output() triggerEvent = new EventEmitter<void>();
  UserType: any;
  UserName: any;

  constructor(private dialog: MatDialog, private router: Router, private notificationService: NotificationService, private ProjectService: ProjectService, private UserService: UserService) { }

  ngOnInit(): void {
    let User = JSON.parse(localStorage.getItem('user') || '{}');
    this.UserType = User.userType;
    this.UserName = User.name;

    this.notificationService.getNotifications().subscribe((notification) => {
      console.log("notification=>", notification);
      this.notifications.unshift(notification);
      this.UserService.showsuccess(`${notification.title}-${notification.message}`);
      this.triggerEvent.emit();
    });
    this.notificationService.getAllNotificationsFromServer().subscribe((notification) => {
      console.log("notification=>", notification);
      this.notifications = notification;
    });
  }

  ngAfterViewInit() {

  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.triggerEvent.emit();
      }
    });
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.triggerEvent.emit();
        this.router.navigate(['/admin-usercreation']);
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
