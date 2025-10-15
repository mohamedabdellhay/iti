import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'todo-task',
  imports: [],
  templateUrl: './todo-task.html',
  styleUrl: './todo-task.css',
})
export class TodoTask {
  @Input() title: string = '';
  @Input() dueDate: string = '';
  @Input() completed: boolean = false;
  @Output() completedChange = new EventEmitter<boolean>();

  toggleCompleted(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.completedChange.emit(checked);
  }
}
