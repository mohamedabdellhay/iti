import { Injectable } from '@angular/core';
import { Department } from '../Models/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  departments: Department[] = [
    {
      id: 1,
      name: 'test 1',
    },
    {
      id: 2,
      name: 'test 2',
    },
  ];

  getAll() {
    return this.departments;
  }
  getById(id: number) {
    return this.departments.filter((d) => d.id === id)[0];
  }
  createDepart(dept: Department) {
    this.departments.push(dept);
  }
}
