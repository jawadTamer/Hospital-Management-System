import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  ],
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctorsArr: any[] = [];
  displayedColumns: string[] = ['name', 'mobile', 'email', 'department', 'gender', 'action'];
  dataSource!: MatTableDataSource<Doctor>;

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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
