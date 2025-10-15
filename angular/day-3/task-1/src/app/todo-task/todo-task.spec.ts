import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTask } from './todo-task';

describe('TodoTask', () => {
  let component: TodoTask;
  let fixture: ComponentFixture<TodoTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
