import { Routes } from '@angular/router';
import { CourseList } from './course-list/course-list';
import { CreateCourse } from './create-course/create-course';
import { EditCourse } from './edit-course/edit-course';
import { DeleteCourse } from './delete-course/delete-course';

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
      {
        path: ':id/edit',
        component: EditCourse,
        title: 'Edit Course Data',
      },
      {
        path: ':id/delete',
        component: DeleteCourse,
      },
    ],
  },
];
