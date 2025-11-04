import { Component } from '@angular/core';
import { Student } from '../../Models/student';
import { StudentService } from '../../_services/student-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'createStudent',
  imports: [FormsModule],
  templateUrl: './create-student.html',
  styleUrl: './create-student.css',
})
export class CreateStudent {
  std: Student = new Student(0, '');

  constructor(public studentService: StudentService) {}

  save() {
    console.log(this.std);
    this.studentService.addStudent(this.std);
    this.std = new Student(0, '');
  }
}
