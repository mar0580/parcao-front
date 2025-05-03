import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './auth.routes';
import { AuthGuard } from '../components/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: AUTH_ROUTES
  },
  {
    path: '',
    loadChildren: () => import('../routes/home.routes').then(m => m.HOME_ROUTES),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'auth/login' }
];
