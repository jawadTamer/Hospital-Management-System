import { LayoutModule } from '@angular/cdk/layout';
import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Validators } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModel } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import{MatDatepicker} from '@angular/material/datepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DataService } from '../../../../shared/service/data.service';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [MatButtonModule,MatSelectModule,MatIconModule,MatListModule,MatRadioModule,MatToolbarModule,LayoutModule,MatDialogModule,ReactiveFormsModule,MatGridListModule,MatFormFieldModule,MatInputModule,NgIf,NgFor,MatOptionModule,MatDatepickerModule],
templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientComponent {
  form !: FormGroup;
  title !: string;
  patient_name !: string;
  mobile !: string;
  gender !: string;
  admission_date !: Date;
  prescription  !: string;
  patient_id !: string;
  buttonName !: string;
  doctor_id !: string;
  doctor_name !: string;

allDoctors:any[]=[];

private dataApi = inject(DataService);

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddPatientComponent>
){
  this.title = data.title;
  this.patient_name = data.patient_name;
  this.mobile = data.mobile;
  this.gender= data.gender;
  this.admission_date = data.admission_date;
  this.prescription = data.prescription;
 this.patient_id = data.patient_id; 
 this.buttonName = data.buttonName;
 this.doctor_id = data.doctor_id;
 this.doctor_name = data.doctor_name;
}

ngOnInit(): void {
  this.getAllDoctors();
  this.form = this.fb.group({
    patient_id: [this.patient_id, []],
    patient_name : [this.patient_name, [Validators.required]],
    mobile : [this.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    gender : [this.gender, [Validators.required]],
    doctor_id : [this.doctor_id, [Validators.required]],
    doctor_name : [this.doctor_name, []],
    admission_date : [this.admission_date, [Validators.required]],
    prescription : [this.prescription, [Validators.required]]
  })
}
getAllDoctors() {
  this.dataApi.getAllDoctors().subscribe(res => {
    this.allDoctors = res.map((doctor: any) => {
      return {
        doctor_name: doctor.name,
        doctor_id: doctor.id
      }
    })
    console.log(this.allDoctors);
  })
}

cancelRegistration() {
  this.dialogRef.close();
}

async registerPatient() {
  this.form.value.doctor_name = await this.getDoctorName(this.form.value.doctor_id);
  this.dialogRef.close(this.form.value);
}

getDoctorName(doctorId : string) {
  for( let i = 0; i < this.allDoctors.length; i++) {
    if(this.allDoctors[i].doctor_id == doctorId) {
      return this.allDoctors[i].doctor_name;
    }
  }
  return "";
}
}
