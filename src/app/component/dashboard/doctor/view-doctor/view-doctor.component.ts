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
import { Patient } from './../../../../shared/model/patient';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddPatientComponent } from '../../patient/add-patient/add-patient.component';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-view-doctor',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    LayoutModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,    
    MatSortModule,     
    FormsModule        
  ],
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent implements OnInit {
  id: any;
  doctor: any;
  isLoading = true;
  allPatients: Patient[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'gender', 'prescription', 'action'];
  dataSource!: MatTableDataSource<Patient>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private route = inject(ActivatedRoute);
  private dataApi = inject(DataService);
  private _snackBar = inject(MatSnackBar);

  private dialog = inject(MatDialog);

  constructor() {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getDoctorById();
    this.getAllPatientsForDoctor();
  }

  getDoctorById() {
    this.dataApi.getDoctorById(this.id).then((doctor) => {
      this.doctor = doctor;
      this.isLoading = false;
      console.log(this.doctor);
    });
  }
  getAllPatientsForDoctor() {
    this.dataApi.getAllPatients().subscribe((patients: any[]) => {
      // Filter patients for current doctor
      this.allPatients = patients.filter(patient => patient.doctor_id === this.id);
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
    window.open('/dashboard/patient/'+row.patient_id,'_blank');
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
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}