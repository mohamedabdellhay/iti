import { Component, OnInit } from '@angular/core';
import { Department } from '../../Models/department';
import { DepartmentService } from '../../_services/department-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-department',
  imports: [FormsModule],
  templateUrl: './edit-department.html',
  styleUrl: './edit-department.css',
})
export class EditDepartment implements OnInit {
  dept!: Department;
  deptId!: string;
  constructor(
    public departmentService: DepartmentService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.deptId = params.get('id') || '';
    });

    this.dept = this.departmentService.getById(parseInt(this.deptId));
  }
  update() {
    this.router.navigate(['/departments']);
  }
}
