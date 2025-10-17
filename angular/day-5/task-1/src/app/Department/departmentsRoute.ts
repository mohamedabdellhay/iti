import { Routes } from '@angular/router';
import { AddDepartment } from './add-department/add-department';
import { DepartmentList } from './department-list/department-list';
import { EditDepartment } from './edit-department/edit-department';
import { DeleteDepartment } from './delete-department/delete-department';

export const departmentsRoutes: Routes = [
  {
    path: '',
    component: DepartmentList,
    title: 'departments',
    children: [
      {
        path: 'create',
        component: AddDepartment,
        title: 'create New department',
      },
      {
        path: ':id/edit',
        component: EditDepartment,
        title: 'Edit Department Data',
      },
      {
        path: ':id/delete',
        component: DeleteDepartment,
        title: 'Delete Department',
      },
    ],
  },
];
