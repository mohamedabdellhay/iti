import { Routes } from '@angular/router';
import { CourseList } from './course-list/course-list';
import { CreateCourse } from './create-course/create-course';

export const courseRoutes: Routes = [
  {
    path: '',
    component: CourseList,
    title: 'course',
    children: [
      {
        path: 'create',
        component: CreateCourse,
        title: 'create new course',
      },
    ],
  },
];
