import { Routes } from '@angular/router';

import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: 'students',
    loadChildren: () => import('./Student/studentsRouter').then((s) => s.studentRoutes),
  },
  {
    path: 'courses',
    loadChildren: () => import('./Course/courseRouter').then((c) => c.courseRoutes),
  },
  {
    path: 'departments',
    loadChildren: () => import('./Department/departmentsRoute').then((d) => d.departmentsRoutes),
  },

  {
    path: '**',
    component: NotFound,
    title: 'Page Not Found',
  },
];
