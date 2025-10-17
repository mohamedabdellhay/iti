import { Component } from '@angular/core';
import { Student } from '../../Models/student';
import { StudentService } from '../../_services/student-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-student',
  imports: [],
  templateUrl: './delete-student.html',
  styleUrl: './delete-student.css',
})
export class DeleteStudent {
  std!: Student;
  stdId!: string;

  constructor(
    public stdService: StudentService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.stdId = params.get('id') || '';
    });

    this.std = this.stdService.getStudentById(parseInt(this.stdId));
    this.stdService.deleteStudent(this.std);
    setTimeout(() => {
      this.router.navigate(['/courses']);
    }, 3000);
  }
}
