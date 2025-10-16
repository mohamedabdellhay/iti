import { Routes } from '@angular/router';
import { StudentList } from './student-list/student-list';
import { CreateStudent } from './create-student/create-student';

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
    ],
  },
];
