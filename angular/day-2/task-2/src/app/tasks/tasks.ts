import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  tasks: { title: string; completed: boolean }[] = [];

  addTask(title: string) {
    if (title.trim()) {
      this.tasks.push({ title: title.trim(), completed: false });
    }
  }
  toggleTaskCompletion(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    if (this.tasks[index].completed) {
      const [task] = this.tasks.splice(index, 1);
      this.tasks.push(task);
    }
  }

  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
