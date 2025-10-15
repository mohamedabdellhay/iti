import { Component, Input, input, OnInit } from '@angular/core';
import { StudentService } from '../../_services/student-service';
import { Student } from '../../Models/student';

@Component({
  selector: 'studentDetails',
  imports: [],
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
