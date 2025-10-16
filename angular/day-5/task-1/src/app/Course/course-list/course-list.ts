import { Component, OnInit } from '@angular/core';
import { CourseDetails } from '../course-details/course-details';
import { Course } from '../../Models/course';
import { CourseService } from '../../_services/course-service';
import { CreateCourse } from '../create-course/create-course';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-course-list',
  imports: [CourseDetails, RouterOutlet, RouterLinkWithHref],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses: Course[] = [];

  constructor(public courseService: CourseService) {}

  ngOnInit(): void {
    this.courses = this.courseService.getAll();
  }
}
