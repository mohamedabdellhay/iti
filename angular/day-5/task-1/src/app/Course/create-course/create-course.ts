import { Component, inject } from '@angular/core';
import { Course } from '../../Models/course';
import { CourseService } from '../../_services/course-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  imports: [FormsModule],
  templateUrl: './create-course.html',
  styleUrl: './create-course.css',
})
export class CreateCourse {
  crs: Course = new Course(0, '');

  constructor(public courseService: CourseService, public router: Router) {}

  save() {
    console.log(this.crs);

    this.courseService.createCourse(this.crs);
    console.log(this.crs);
    this.router.navigate(['/courses']);
  }
}
