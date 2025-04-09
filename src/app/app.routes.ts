import { Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { SidebarComponent } from './component/dashboard/sidebar/sidebar.component';
import { AuthGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: SidebarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        children: [
          { 
            path: 'profile',
            loadComponent: () => import('./component/dashboard/profile/profile.component').then(m => m.ProfileComponent)
          },
          { 
            path: 'patient',
            loadComponent: () => import('./component/dashboard/patient/patient.component').then(m => m.PatientComponent)
          },
          { 
            path: 'patient/:id',
            loadComponent: () => import('./component/dashboard/patient/view-patient/view-patient.component').then(m => m.ViewPatientComponent)
          },
          { 
            path: 'doctor',
            loadComponent: () => import('./component/dashboard/doctor/doctor.component').then(m => m.DoctorComponent)
          },
          { 
            path: 'doctor/:id',
            loadComponent: () => import('./component/dashboard/doctor/view-doctor/view-doctor.component').then(m => m.ViewDoctorComponent)
          }
        ]
      },
      { path: '', redirectTo: 'dashboard/profile', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login' }
];
