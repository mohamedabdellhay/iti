import { Routes } from '@angular/router';
import { StudentList } from './Student/student-list/student-list';
import { CourseList } from './Course/course-list/course-list';
import { NotFound } from './pages/not-found/not-found';
// import { DepartmentList } from './Department/department-list/department-list';
// import { departmentsRoutes } from './Department/departmentsRoute';

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
    loadChildren: () =>
      import('./pages/departments/departmentsRoute').then((d) => d.departmentsRoutes),
  },

  {
    path: '**',
    component: NotFound,
    title: 'Page Not Found',
  },
];
