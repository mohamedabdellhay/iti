import { Component, inject, OnInit } from '@angular/core';
import { Course } from '../../Models/course';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../_services/course-service';

@Component({
  selector: 'app-edit-course',
  imports: [FormsModule],
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.css',
})
export class EditCourse implements OnInit {
  crs!: Course;
  courseId!: string;

  constructor(private route: ActivatedRoute, public crsService: CourseService) {}
  ngOnInit(): void {
    // Or, subscribing to changes in route parameters (recommended for dynamic updates)
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('id') || '';
    });

    this.crs = this.crsService.getById(parseInt(this.courseId));
  }
  update() {
    this.crsService.updateCourse(this.crs);
  }
}
