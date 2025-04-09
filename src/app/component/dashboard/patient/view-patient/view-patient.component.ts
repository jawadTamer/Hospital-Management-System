import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../shared/service/data.service';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-view-patient',
  standalone: true,
  imports: [ MatCardModule,
  MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    LayoutModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CommonModule,],
  templateUrl: './view-patient.component.html',
  styleUrl: './view-patient.component.css'
})
export class ViewPatientComponent {
  patient_id !: any;
  patientObj !: any;
  isLoading = true;

  private route = inject(ActivatedRoute);
  private dataApi = inject(DataService);
  private _snackBar = inject(MatSnackBar);

  private dialog = inject(MatDialog);

  constructor() {
    this.patient_id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPatientById();
  }

  getPatientById() {
    this.dataApi.getPatientById(this.patient_id).then((Patient) => {
      this.patientObj = Patient;
      this.patientObj.admission_date = this.patientObj.admission_date.toDate();
      this.isLoading = false;
      
      console.log(Patient);
    })
  }
}
