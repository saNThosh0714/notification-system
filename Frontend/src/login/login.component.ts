import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { SupportModule } from '../support.module';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../UserDashboard/add-user-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SupportModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginData = {
    userType: '',
    name: '',
    password: ''
  };

  constructor(private dialog: MatDialog,private router: Router, private UserService: UserService) { }

  onSubmit(form: any) {
    if (form.valid) {
      this.UserService.login(this.loginData).subscribe((data: any) => {
        console.log("User data", data);
        debugger;
        if (data.success) {
          this.UserService.showsuccess(data.message);

          // Save user info in localStorage
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.access_token);

          // Redirect based on userType
          if (this.loginData.userType === 'Admin') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/user-dashboard']);
          }
        } else {
          this.UserService.showerror(data.message);
        }
      })

    }
  }

  openAddUserDialog() {
      const dialogRef = this.dialog.open(AddUserDialogComponent, {
        width: '400px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
      });
    }
}
