import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../Models/course';
import { CourseService } from '../../_services/course-service';

@Component({
  selector: 'app-course-details',
  imports: [],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails implements OnInit {
  @Input() crsId!: number;
  crs: Course = new Course(0, '');
  constructor(public courseService: CourseService) {}
  ngOnInit(): void {
    this.crs = this.courseService.getById(this.crsId);
  }
}
