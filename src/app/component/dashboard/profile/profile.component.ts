import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userEmail: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.userEmail = user?.email || 'Not available';
  }

  signOut() {
    this.authService.logout();
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.authService.deleteAccount().then(() => {
        this.router.navigate(['/login']);
      }).catch(error => {
        console.error('Error deleting account:', error);
        alert('Failed to delete account. Please try again.');
      });
    }
  }
}
