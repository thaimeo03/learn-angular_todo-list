import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: '',
    component: AuthComponent,
    loadChildren: () => import('./pages/auth/entry.routes').then((m) => m.remoteRoutes),
  },
];
