import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectDialogComponent } from './add-project-dialog.component';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HeaderComponent } from '../Header/Header.component';
import { SupportModule } from '../support.module';
import { UserService } from '../user.service';

export interface projectdetails {
  id?: number;
  name?: string;
  description?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SupportModule,
    AddProjectDialogComponent,
    HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {

  displayedColumns = ['name', 'description', 'action'];
  projects: projectdetails[] = [];

  dataSource = new MatTableDataSource<projectdetails>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  UserType: any;

  constructor(private dialog: MatDialog, private router: Router, private UserService: UserService, private ProjectService: ProjectService) { }

  ngOnInit(): void {
    let User = JSON.parse(localStorage.getItem('user') || '{}');
    this.UserType = User.userType;
    if(this.UserType == 'User'){
      this.displayedColumns = this.displayedColumns.filter(col => col !== 'action');
    }
    this.getprojects();
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
    this.getprojects();
  }

  getprojects() {
    this.ProjectService.getProjects().subscribe((data) => {
      console.log("project data", data);
      this.projects = data;
      this.dataSource.data = this.projects;
    })
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getprojects();
      }
    });
  }

  editproject(data: projectdetails) {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getprojects();
      }
    });
  }

  deleteproject(data: any) {
    this.ProjectService.deleteProject(data.id).subscribe((data) => {
      this.UserService.showsuccess('Deleted Successfully!');
      this.getprojects();
    })
  }


}
