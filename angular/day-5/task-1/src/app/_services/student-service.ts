import { Injectable } from '@angular/core';
import { Student } from '../Models/student';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: Student[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mohamed Abdellhay' },
  ];

  addStudent(student: Student) {
    this.students.push(student);
  }

  getStudents(): Student[] {
    return this.students;
  }
  getStudentById(id: number): Student {
    return this.students.find((student) => student.id === id) || new Student(0, 'No Student Found');
  }

  editStudent(index: number, updatedStudent: Student) {
    if (index >= 0 && index < this.students.length) {
      this.students[index] = updatedStudent;
    }
  }
  getStudentIndex(std: Student) {
    return this.students.findIndex((ele) => ele.id === std.id && ele.name == std.name);
  }
  deleteStudent(std: Student) {
    this.students.splice(this.getStudentIndex(std), 1);
  }
}
