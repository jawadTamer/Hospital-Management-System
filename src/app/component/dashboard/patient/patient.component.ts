import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Doctor } from '../../../shared/model/doctor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { DataService } from '../../../shared/service/data.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, NgIf } from '@angular/common';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { Patient } from '../../../shared/model/patient';
import { DeletePatientComponent } from './delete-patient/delete-patient.component';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    LayoutModule,
    FormsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatSortModule,  
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
})
export class PatientComponent {
  allPatients: Patient[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'doctor', 'gender', 'action'];
  dataSource!: MatTableDataSource<Patient>;
  isLoading = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private dataApi = inject(DataService);
  private _snackBar = inject(MatSnackBar);

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.getAllPatients();
  }
  addPatient() {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Add Patient',
      buttonName: 'Register',
    };

    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.dataApi.addPatient(data);
        this.openSnackBar('Registration of Patient is successful.', 'OK');
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  getAllPatients() {
    this.dataApi.getAllPatients().subscribe((data: any) => {
      this.allPatients = data;
      this.dataSource = new MatTableDataSource(this.allPatients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  viewPatient(row : any) {
    window.open('/dashboard/patient/' + row.patient_id, '_blank');
  }

  editPatient(row : any) {
    if(row.patient_id == null || row.patient_name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = "Edit patient";
    dialogConfig.data.buttonName = "Update";
    dialogConfig.data.admission_date = row.admission_date.toDate();

    console.log(dialogConfig.data);

    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.dataApi.updatePatient(data);
        this.openSnackBar("Patient is updated successfully.", "OK")
      }
    })
  }

  deletePatient(row : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title : 'Delete patient',
      patientName : row.patient_name
    }

    const dialogRef = this.dialog.open(DeletePatientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        console.log(row);
        this.dataApi.deletePatient(row.patient_id);
        this.openSnackBar("Patient deleted successfully.", "OK")
      }
    })
  }
  
}
