import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: 'users.html',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule, FormsModule],
})
export class TableTemplateDemo implements OnInit {
  users: any[] = [];
  temp: any[] = [];
  isLoading: boolean = true;

  searchResult(val: string) {
    if (!val) {
      this.users = this.temp;
    }
    this.users = this.users.filter((user) =>
      user.firstName.toLowerCase().includes(val.toLowerCase())
    );
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsersFromJson();
  }

  loadUsersFromJson(): void {
    this.http.get<any[]>('users.json').subscribe({
      next: (data) => {
        this.temp = data;
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading users from JSON:', err);
        this.isLoading = false;
      },
    });
  }

  getRole(role: string): string {
    switch (role) {
      case 'Admin':
        return 'success';
      case 'User':
        return 'info';
      case 'anonymous':
        return 'warning';
      default:
        return 'default';
    }
  }
}
