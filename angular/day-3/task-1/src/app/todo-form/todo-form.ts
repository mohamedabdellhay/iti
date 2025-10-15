import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'todo-form',
  imports: [],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  @Output() taskAdded = new EventEmitter<{ title: string; dueDate: string }>();

  addTask(title: string, dueDate: string) {
    if (title) {
      this.taskAdded.emit({ title, dueDate });
    }
  }
}
