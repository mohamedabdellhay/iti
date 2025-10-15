import { Injectable } from '@angular/core';
import { Course } from '../Models/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courses: Course[] = [{ id: 1, name: 'test' }];

  getAll() {
    return this.courses;
  }
  getById(id: number): Course {
    return this.courses.filter((c) => c.id === id)[0] || new Course(0, '');
  }
  createCourse(crs: Course) {
    this.courses.push(crs);
  }
}
