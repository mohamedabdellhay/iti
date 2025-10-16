import { Routes } from '@angular/router';
import { DepartmentList } from '../../Department/department-list/department-list';
import { AddDepartment } from '../../Department/add-department/add-department';
import { Departments } from './departments';

export const departmentsRoutes: Routes = [
  {
    path: '',
    component: Departments,
    title: 'departments',
    children: [
      {
        path: 'create',
        component: AddDepartment,
        title: 'create New department',
      },
    ],
  },
];
