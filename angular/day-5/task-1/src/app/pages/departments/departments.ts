import { Component } from '@angular/core';
import { DepartmentList } from '../../Department/department-list/department-list';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-departments',
  imports: [RouterOutlet, RouterLinkWithHref, DepartmentList],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class Departments {}
