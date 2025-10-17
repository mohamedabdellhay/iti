import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStudent } from './delete-student';

describe('DeleteStudent', () => {
  let component: DeleteStudent;
  let fixture: ComponentFixture<DeleteStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
