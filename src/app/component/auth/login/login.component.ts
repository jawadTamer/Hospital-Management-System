import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../shared/service/auth.service';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCard,
    MatCardTitle,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!: FormGroup;
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authApi: AuthService,
    private fb: FormBuilder,
    private router: Router  
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.form.valid) {
      this.errorMessage = '';
      this.authApi.login(this.form.value.email, this.form.value.password)
        .catch(error => {
          this.errorMessage = error.message;
          console.error('Login error:', error);
        });
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
