import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SignupRequestDTO } from '../../models/signup-request';

@Component({
  selector: 'app-register',
  standalone: true,
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  userData: SignupRequestDTO = {
    userName: '',
    email: '',
    password: ''
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.userData).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! You can now login.';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.error || 'Registration failed';
        this.successMessage = '';
      }
    });
  }
}
