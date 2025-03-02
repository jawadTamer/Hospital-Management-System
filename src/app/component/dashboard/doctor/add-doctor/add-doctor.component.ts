import { LayoutModule } from '@angular/cdk/layout';
import { Component, Inject } from '@angular/core';
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

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [MatButtonModule,MatSelectModule,MatIconModule,MatListModule,MatRadioModule,MatToolbarModule,LayoutModule,MatDialogModule,ReactiveFormsModule,MatGridListModule,MatFormFieldModule,MatInputModule,NgIf,NgFor,MatOptionModule,MatDatepickerModule],
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent {
  form !: FormGroup;
  title !: string;
  name !: string;
  mobile !: string;
  email !: string;
  gender !: string;
  department !: string;
  birthdate !: Date;
  qualification !: string;
  id !: string;
  buttonName !: string;

  departments : string[] = ['Orthopedics','Cardiology','Otorhinolaryngology','Ophthalmology','Psychiatry','Internal medicine','Radiology','Surgery','Pediatrics','Neurology','Urology','Anesthesiology','Nephrology','Neurosurgery','Gastroenterology','Pulmonology','General surgery','Intensive care medicine','Oncology','Pathology','Emergency medicine','Neonatology','Hematology','Pharmacy','Physical medicine and rehabilitation','Vascular surgery','Geriatrics','Gynaecology','Cardiac surgery','Outpatient department','Nuclear medicine','Infectious diseases','Clinical pathology','Intensive care unit','operating room','Casualty department']
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddDoctorComponent>
){
     this.title = data.title; 
    this.title = data.title;
    this.id = data.id;
    this.name = data.name;
    this.mobile = data.mobile;
    this.email = data.email;
    this.gender = data.gender;
    this.department = data.department;
    this.birthdate = data.birthdate;
    this.qualification = data.qualification;
    this.buttonName = data.buttonName;
  }

  

  ngOnInit() {
    this.form = this.fb.group({
      id: [this.id, []],
      name : [this.name, [Validators.required]],
      mobile : [this.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email : [this.email, [Validators.required, Validators.email]],
      gender : [this.gender, [Validators.required]],
      department : [this.department, [Validators.required]],
      birthdate : [this.birthdate, [Validators.required]],
      qualification : [this.qualification,[Validators.required]]
  })}
 
  
  cancelRegistration() {
    this.dialogRef.close();
  }

  registerDoctor() {
    this.dialogRef.close(this.form.value);
  }
}

