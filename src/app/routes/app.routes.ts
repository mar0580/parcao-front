import {Routes} from '@angular/router';
import {AuthGuard} from '../components/auth/auth.guard';
import {LayoutComponent} from '../core/layout/layout.component';
import {AdminGuard} from '../core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../routes/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        loadComponent: () => import('../features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('../components/register/register.component').then(m => m.RegisterComponent),
        canActivate: [AdminGuard] // Protege a rota apenas para admins
      },
      // Outras rotas protegidas
    ]
  }
];
