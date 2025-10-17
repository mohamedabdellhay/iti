import { Component, OnInit } from '@angular/core';
import { Department } from '../../Models/department';
import { DepartmentService } from '../../_services/department-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-department',
  imports: [],
  templateUrl: './delete-department.html',
  styleUrl: './delete-department.css',
})
export class DeleteDepartment implements OnInit {
  dept!: Department;
  deptId!: string;
  constructor(
    public departmentService: DepartmentService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.deptId = params.get('id') || '';
    });

    this.dept = this.departmentService.getById(parseInt(this.deptId));
    this.departmentService.deleteDepartment(this.dept);
    setTimeout(() => {
      this.router.navigate(['/courses']);
    }, 3000);
  }
}
