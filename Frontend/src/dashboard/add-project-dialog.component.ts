import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../project.service';
import { projectdetails } from './dashboard.component';
import { SupportModule } from '../support.module';
import { UserService } from '../user.service';


@Component({
    selector: 'app-add-project-dialog',
    standalone: true,
    templateUrl: './add-project-dialog.component.html',
    imports: [
        SupportModule
    ],
})
export class AddProjectDialogComponent {
    project: projectdetails = {};
    btnname = 'Add';

    constructor(private ProjectService: ProjectService, private dialogRef: MatDialogRef<AddProjectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private UserService: UserService) { }

    ngOnInit() {
        if (this.data) {
            this.btnname = 'Update';
            this.ProjectService.getProject(this.data.id).subscribe((data) => {
                console.log("project data", data);
                this.project = data;
            })
        }
    }

    save() {
        if (this.data) {
            this.ProjectService.updateProject(this.data.id, this.project).subscribe((data) => {
                console.log("project data", data);
                this.UserService.showsuccess('Updated Successfully!');
                this.dialogRef.close(this.project);
            })
        } else {
            this.ProjectService.createProject(this.project).subscribe((data) => {
                console.log("project data", data);
                this.UserService.showsuccess('Added Successfully!');
                this.dialogRef.close(this.project);
            })
        }
    }

    close() {
        this.dialogRef.close();
    }
}
