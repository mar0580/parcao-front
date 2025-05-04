import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  validateEmail(email: string): string | null {
    if (!email) {
      return 'O e-mail é obrigatório.';
    }

    if (!this.emailRegex.test(email)) {
      return 'Por favor, insira um e-mail válido.';
    }

    return null;
  }

  validatePassword(password: string): string | null {
    if (!password) {
      return 'A senha é obrigatória.';
    }

    if (password.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres.';
    }

    if (password.length > 8) {
      return 'A senha deve ter no máximo 8 caracteres.';
    }

    return null;
  }

  validateFullName(nomeCompleto: string): string | null {
    if (!nomeCompleto) {
      return 'O nome completo é obrigatório.';
    }

    if (nomeCompleto.length < 3) {
      return 'O nome deve ter pelo menos 3 caracteres.';
    }

    return null;
  }

  validateSelectedOptions(options: Set<any>, fieldName: string): string | null {
    if (options.size === 0) {
      return `Selecione pelo menos uma ${fieldName}.`;
    }

    return null;
  }

  validateUserName(userName: string) {
    if (!userName) {
      return 'O nome de usuário é obrigatório.';
    }

    if (userName.length < 7) {
      return 'O nome de usuário deve ter pelo menos 7 caracteres.';
    }

    return null;
  }
}
