import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { provideNativeDateAdapter } from '@angular/material/core'; // ✅ Import Date Adapter

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), 
    provideFirestore(() => getFirestore()),
    provideNativeDateAdapter(), // ✅ Fix: Provide the Date Adapter
  ],
};
