import { LayoutModule } from '@angular/cdk/layout';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-doctor',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule, MatListModule, MatToolbarModule, LayoutModule, MatDialogModule, ReactiveFormsModule],
templateUrl: './delete-doctor.component.html',
  styleUrl: './delete-doctor.component.css'
})
export class DeleteDoctorComponent {
  doctorName: string;
  title !: string;
  constructor(
    @Inject(MAT_DIALOG_DATA)  data: any,
    private dialogRef: MatDialogRef<DeleteDoctorComponent>
  ) {
    this.doctorName = data.doctorName;
    this.title = data.title;
  }
  delete() {
    
    this.dialogRef.close(true);
  }
  close() {
 this.dialogRef.close();
  }
}
