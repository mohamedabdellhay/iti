import { Component } from '@angular/core';
import { Course } from '../../Models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../_services/course-service';

@Component({
  selector: 'app-delete-course',
  imports: [],
  templateUrl: './delete-course.html',
  styleUrl: './delete-course.css',
})
export class DeleteCourse {
  crs!: Course;
  courseId!: string;

  constructor(
    private route: ActivatedRoute,
    public crsService: CourseService,
    public router: Router
  ) {}
  ngOnInit(): void {
    // Or, subscribing to changes in route parameters (recommended for dynamic updates)
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('id') || '';
    });

    this.crs = this.crsService.getById(parseInt(this.courseId));
    this.crsService.deleteCourse(this.crs);
    setTimeout(() => {
      this.router.navigate(['/courses']);
    }, 3000);
  }
}
