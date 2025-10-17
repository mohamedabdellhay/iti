import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDepartment } from './edit-department';

describe('EditDepartment', () => {
  let component: EditDepartment;
  let fixture: ComponentFixture<EditDepartment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDepartment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDepartment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
