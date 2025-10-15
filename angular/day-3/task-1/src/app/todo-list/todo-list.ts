import { Component, Input } from '@angular/core';
import { TodoTask } from '../todo-task/todo-task';

@Component({
  selector: 'todo-list',
  imports: [TodoTask],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  @Input() tasks: { title: string; dueDate: string; completed: boolean }[] = [];

  onCompletedChange(index: number, completed: boolean) {
    this.tasks[index].completed = completed;
  }
}
