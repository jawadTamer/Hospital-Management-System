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
  selector: 'app-delete-patient',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule, MatListModule, MatToolbarModule, LayoutModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './delete-patient.component.html',
  styleUrl: './delete-patient.component.css'
})
export class DeletePatientComponent {
  patientName !: string;
  title !: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<DeletePatientComponent>
  ) {
    this.patientName = data.patientName;
    this.title = data.title;
  }


  close() {
    this.dialogRef.close();
  }

  delete() {
    const deletePatient = true;
    this.dialogRef.close(deletePatient);
  }
}
