import { Component, Input, OnInit } from '@angular/core';
import { Department } from '../../Models/department';
import { DepartmentService } from '../../_services/department-service';
@Component({
  selector: 'app-department-details',
  imports: [],
  templateUrl: './department-details.html',
  styleUrl: './department-details.css',
})
export class DepartmentDetails implements OnInit {
  @Input() deptId: number = 0;
  depart: Department = new Department(0, '');

  constructor(public departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.depart = this.departmentService.getById(this.deptId);
  }
}
