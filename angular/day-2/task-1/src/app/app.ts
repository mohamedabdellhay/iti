import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableTemplateDemo } from './users/users';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, TableTemplateDemo],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('task-1');
}
