import { Component, Input, input, OnInit } from '@angular/core';
import { StudentService } from '../../_services/student-service';
import { Student } from '../../Models/student';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'studentDetails',
  imports: [RouterLink],
  templateUrl: './student-details.html',
  styleUrl: './student-details.css',
})
export class StudentDetails implements OnInit {
  @Input() stdId: number = 0;
  std: Student = new Student(0, '');

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.std = this.studentService.getStudentById(this.stdId);
  }
}
