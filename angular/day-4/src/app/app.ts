import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentList } from './Student/student-list/student-list';
import { DepartmentList } from './Department/department-list/department-list';
import { CourseList } from './Course/course-list/course-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StudentList, DepartmentList, CourseList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('day-4');
}
