import { Component, OnInit } from '@angular/core';
import { StudentDetails } from '../student-details/student-details';
import { StudentService } from '../../_services/student-service';
import { Student } from '../../Models/student';
import { CreateStudent } from '../create-student/create-student';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'studentList',
  imports: [StudentDetails, RouterOutlet, RouterLinkWithHref],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {
  students: Student[] = [];
  public path: string = '';
  constructor(public studentService: StudentService, public router: Router) {
    this.path = this.router.url;
    console.log(this.path);
  }

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
  }
}
