import { Component, OnInit } from '@angular/core';
import { StudentDetails } from '../student-details/student-details';
import { StudentService } from '../../_services/student-service';
import { Student } from '../../Models/student';
import { CreateStudent } from '../create-student/create-student';

@Component({
  selector: 'studentList',
  imports: [StudentDetails, CreateStudent],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
  students: Student[] = [];
  constructor(public studentService: StudentService) {}

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
  }
}
