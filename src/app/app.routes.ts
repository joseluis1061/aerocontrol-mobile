import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'flights',
    loadComponent: () =>
      import('./pages/flights/flights.page').then((m) => m.FlightsPage),
  },
  {
    path: 'airports',
    loadComponent: () =>
      import('./pages/airports/airports.page').then((m) => m.AirportsPage),
  },
  {
    path: 'programs',
    loadComponent: () =>
      import('./pages/programs/programs.page').then((m) => m.ProgramsPage),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.page').then((m) => m.UsersPage),
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./pages/reports/reports.page').then((m) => m.ReportsPage),
  },

];
