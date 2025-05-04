import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequestDTO } from '../../models/login-request';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: LoginRequestDTO = {
    userName: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token); // Store the token
          this.router.navigate(['/']); // Redirect to Home
        } else {
          this.errorMessage = response.message || 'Login failed';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed';
      }
    });
  }
}
