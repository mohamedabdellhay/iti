import { Component, OnInit } from '@angular/core';
// import { AddDepartment } from '../add-department/add-department';
import { DepartmentDetails } from '../department-details/department-details';
import { Department } from '../../Models/department';
import { DepartmentService } from '../../_services/department-service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'departmentList',
  imports: [DepartmentDetails, RouterOutlet, RouterLink],
  templateUrl: './department-list.html',
  styleUrl: './department-list.css',
})
export class DepartmentList implements OnInit {
  departments: Department[] = [];
  constructor(public departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.departments = this.departmentService.getAll();
  }
}
