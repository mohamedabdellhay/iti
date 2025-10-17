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
  updateCourse(crs: Course) {
    const course = this.courses.findIndex((ele) => ele.id === crs.id);
    this.courses[course] = crs;
    console.log(course);
  }
  getCourseIndex(crs: Course) {
    return this.courses.findIndex((ele) => ele.id === crs.id && ele.name == crs.name);
  }
  deleteCourse(crs: Course) {
    this.courses.splice(this.getCourseIndex(crs), 1);
  }
}
