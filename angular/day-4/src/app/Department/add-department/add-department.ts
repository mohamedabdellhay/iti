import { Component, Input, OnInit } from '@angular/core';
import { Department } from '../../Models/department';
import { DepartmentService } from '../../_services/department-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'AddDepartment',
  imports: [FormsModule],
  templateUrl: './add-department.html',
  styleUrl: './add-department.css',
})
export class AddDepartment {
  dept: Department = new Department(0, '');

  constructor(public departmentService: DepartmentService) {}

  save() {
    this.departmentService.createDepart(this.dept);
  }
}
