import { Routes } from '@angular/router';
import { StudentList } from './student-list/student-list';
import { CreateStudent } from './create-student/create-student';
import { EditStudent } from './edit-student/edit-student';
import { DeleteStudent } from './delete-student/delete-student';

export const studentRoutes: Routes = [
  {
    path: '',
    component: StudentList,
    title: 'students',
    children: [
      {
        path: 'create',
        component: CreateStudent,
        title: 'create new student',
      },
      {
        path: ':id/edit',
        component: EditStudent,
        title: 'Edit Student Data',
      },
      {
        path: ':id/delete',
        component: DeleteStudent,
        title: 'Delete Student',
      },
    ],
  },
];
