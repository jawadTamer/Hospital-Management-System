import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Doctor } from '../../../shared/model/doctor';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DeleteDoctorComponent } from './delete-doctor/delete-doctor.component';
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

@Component({
  selector: 'app-doctor',
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
    CommonModule
  
  ],
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctorsArr: any[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'email', 'department', 'gender', 'action'];
  dataSource!: MatTableDataSource<Doctor>;
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private dataApi = inject(DataService);
  private _snackBar = inject(MatSnackBar);

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.dataApi.getAllDoctors().subscribe((data: any) => {
      this.doctorsArr = data;
      this.dataSource = new MatTableDataSource(this.doctorsArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  addDoctor() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Add Doctor',
      buttonName: 'Register'
    };

    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.dataApi.addDoctor(data);
        this.openSnackBar("Registration of doctor is successful.", "OK");
      }
    });
  }

  editDoctor(row: any) {
    if (row.id == null || row.name == null) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      ...row,
      title: 'Edit Doctor',
      buttonName: 'Update',
      birthdate: row.birthdate.toDate()
    };

    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.dataApi.updateDoctor(data);
        this.openSnackBar("Doctor is updated successfully.", "OK");
      }
    });
  }

  updateDoctor(doctor: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Update Doctor',
      buttonName: 'Update',
      doctor: doctor
    };

    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.dataApi.updateDoctor(data);
        this.openSnackBar("Doctor details updated successfully.", "OK");
      }
    });
  }

  deleteDoctor(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Delete Doctor',
      doctorName: row.name
    };

    const dialogRef = this.dialog.open(DeleteDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.dataApi.deleteDoctor(row.id);
        this.openSnackBar("Doctor is deleted successfully.", "OK");
      }
    });
  }

  viewDoctor(row: any) {
    window.open('/dashboard/doctor/' + row.id, '_blank');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}