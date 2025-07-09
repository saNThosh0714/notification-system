import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HeaderComponent } from '../Header/Header.component';
import { SupportModule } from '../support.module';
import { AddUserDialogComponent } from './add-user-dialog.component';

export interface Userdetails {
  id?: number;
  userType?: string;
  name?: string;
  password?: string;
}

@Component({
  selector: 'app-UserDashboard',
  standalone: true,
  imports: [SupportModule,
    AddUserDialogComponent,
    HeaderComponent],
  templateUrl: './UserDashboard.component.html',
  styleUrl: './UserDashboard.component.scss'
})
export class UserDashboardComponent implements AfterViewInit {

  displayedColumns = ['userType','name', 'password', 'action'];
  Users: Userdetails[] = [];

  dataSource = new MatTableDataSource<Userdetails>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private router: Router, private UserService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  handleHeaderClick() {
    this.getUsers();
  }

  getUsers() {
    this.UserService.getUsers().subscribe((data) => {
      console.log("User data", data);
      this.Users = data;
      this.dataSource.data = this.Users;
    })
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUsers();
      }
    });
  }

  editUser(data: Userdetails) {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUsers();
      }
    });
  }

  deleteUser(data: any) {
    this.UserService.deleteUser(data.id).subscribe((data) => {
      this.UserService.showsuccess('Deleted Successfully!');
      this.getUsers();
    })
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


}
