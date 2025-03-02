import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../../shared/service/data.service';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-view-doctor',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    LayoutModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    CommonModule,

  ],
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent implements OnInit {
  id: any;
  doctor: any;
  isLoading = true;

  private route = inject(ActivatedRoute);
  private dataApi = inject(DataService);

  constructor() {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getDoctorById();
  }

  getDoctorById() {
    this.dataApi.getDoctorById(this.id).then((doctor) => {
      this.doctor = doctor;
      this.isLoading = false;
      console.log(this.doctor);
    });
  }
}