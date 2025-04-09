import { Injectable } from "@angular/core";
import { Auth, signInWithEmailAndPassword, signOut, AuthError, createUserWithEmailAndPassword, browserLocalPersistence, setPersistence } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    setPersistence(this.auth, browserLocalPersistence).then(() => {
      // Check initial auth state
      const user = this.auth.currentUser;
      this.loggedIn.next(!!user);
    });
    
    auth.onAuthStateChanged(user => {
      this.loggedIn.next(!!user);
      if (user) {
        localStorage.setItem('user', JSON.stringify({
          email: user.email,
          uid: user.uid
        }));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  login(username: string, password: string) {
    return signInWithEmailAndPassword(this.auth, username, password)
      .then((userCredential) => {
        this.loggedIn.next(true);
        Swal.fire({
          icon: 'success',
          title: 'Welcome back!',
          text: 'Login successful',
          timer: 1500,
          showConfirmButton: false
        });
        this.router.navigate(['/dashboard/profile']);
        return userCredential;
      })
      .catch((error: AuthError) => {
        this.loggedIn.next(false);
        let errorMessage = 'An error occurred during login';
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This account has been disabled';
            break;
          case 'auth/user-not-found':
          case 'auth/invalid-credential':
            errorMessage = 'Invalid email or password';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Invalid password';
            break;
          default:
            errorMessage = 'An error occurred during login. Please try again.';
        }
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage
        });
        throw { message: errorMessage, originalError: error };
      });
  }

  logout() {
    return signOut(this.auth)
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.loggedIn.next(true);
        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: 'Account created successfully',
          timer: 1500,
          showConfirmButton: false
        });
        this.router.navigate(['/dashboard/profile']);  // Changed from '/dashboard' to '/dashboard/profile'
        return userCredential;
      })
      .catch((error: AuthError) => {
        let errorMessage = 'An error occurred during signup';
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already registered';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password should be at least 6 characters';
            break;
          default:
            errorMessage = 'An error occurred during signup. Please try again.';
        }
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: errorMessage
        });
        throw { message: errorMessage, originalError: error };
      });
  }

  deleteAccount() {
    const user = this.auth.currentUser;
    if (!user) return Promise.reject('No user logged in');
    
    return user.delete()
      .then(() => {
        this.loggedIn.next(false);
        return signOut(this.auth); 
      })
      .then(() => {
        this.router.navigate(['/login']); 
      })
      .catch((error) => {
        console.error('Error deleting account:', error);
        throw error;
      });
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(user => {
        resolve(!!user);
      });
    });
  }
}
