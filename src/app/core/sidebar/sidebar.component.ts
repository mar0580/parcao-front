import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() collapsed = false;

  menuItems = [
    { path: '/dashboard', icon: 'fas fa-home', label: 'Dashboard' },
    { path: '/reports', icon: 'fas fa-chart-bar', label: 'Relatórios' },
    { path: '/settings', icon: 'fas fa-cog', label: 'Configurações' }
  ];

  adminItems = [
    { path: '/register', icon: 'fas fa-user-plus', label: 'Cadastrar Usuário' }
  ];

  constructor(public authService: AuthService) {}
}
