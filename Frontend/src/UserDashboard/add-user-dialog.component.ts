import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { Userdetails } from './UserDashboard.component';
import { SupportModule } from '../support.module';


@Component({
    selector: 'app-add-user-dialog',
    standalone: true,
    templateUrl: './add-user-dialog.component.html',
    imports: [
        SupportModule
    ],
})
export class AddUserDialogComponent {
    User: Userdetails = {};
    btnname = 'Add';

    constructor(private UserService: UserService, private dialogRef: MatDialogRef<AddUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {debugger;
        if (this.data) {
            this.btnname = 'Update';
            this.UserService.getUser(this.data._id).subscribe((data) => {
                console.log("User data", data);
                this.User = data;
            })
        }
    }

    save() {
        if (this.data) {
            this.UserService.updateUser(this.data._id, this.User).subscribe((data) => {
                console.log("User data", data);
                this.UserService.showsuccess('Updated Successfully!');
                this.dialogRef.close(this.User);
            })
        } else {
            this.UserService.createUser(this.User).subscribe((data) => {
                console.log("User data", data);
                this.UserService.showsuccess('Added Successfully!');
                this.dialogRef.close(this.User);
            })
        }
    }

    close() {
        this.dialogRef.close();
    }
}
