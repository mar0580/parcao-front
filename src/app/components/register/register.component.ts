import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SignupRequestDTO } from '../../models/signup-request';
import { ValidationService } from '../../services/validation.service';

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
    password: '',
    nomeCompleto: '',
    filial: new Set<string>(),
    role: new Set<string>()
  };

  filiaisDisponiveis: string[] = ['Matriz', 'Filial 1', 'Filial 2'];
  rolesDisponiveis: string[] = ['USUÁRIO', 'ADMIN', 'GERENTE'];

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private validationService: ValidationService
  ) {
    // Verifica se o usuário tem permissão
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/dashboard']);
    }
  }

  toggleFilial(filial: string): void {
    if (this.userData.filial.has(filial)) {
      this.userData.filial.delete(filial);
    } else {
      this.userData.filial.add(filial);
    }
  }

  toggleRole(role: string): void {
    if (this.userData.role.has(role)) {
      this.userData.role.delete(role);
    } else {
      this.userData.role.add(role);
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    // Validações
    const emailError = this.validationService.validateEmail(this.userData.email);
    if (emailError) {
      this.errorMessage = emailError;
      return;
    }

    const passwordError = this.validationService.validatePassword(this.userData.password);
    if (passwordError) {
      this.errorMessage = passwordError;
      return;
    }

    const nameError = this.validationService.validateFullName(this.userData.nomeCompleto);
    if (nameError) {
      this.errorMessage = nameError;
      return;
    }

    const userNameError = this.validationService.validateUserName(this.userData.userName);
    if (userNameError) {
      this.errorMessage = userNameError;
      return;
    }

    const filialError = this.validationService.validateSelectedOptions(this.userData.filial, 'filial');
    if (filialError) {
      this.errorMessage = filialError;
      return;
    }

    const roleError = this.validationService.validateSelectedOptions(this.userData.role, 'role');
    if (roleError) {
      this.errorMessage = roleError;
      return;
    }

    // Converte Set para array para o envio HTTP
    const payload = {
      ...this.userData,
      filial: Array.from(this.userData.filial),
      role: Array.from(this.userData.role)
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.successMessage = 'Cadastro realizado com sucesso! Redirecionando...';
        setTimeout(() => this.router.navigate(['/auth/login']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao cadastrar usuário';
      }
    });
  }
}
