import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoForm } from './todo-form/todo-form';
import { TodoList } from './todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoForm, TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  tasks: { title: string; dueDate: string; completed: boolean }[] = [];

  onTaskAdded(task: { title: string; dueDate: string }) {
    this.tasks.push({ ...task, completed: false });
  }
}
