import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDepartment } from './delete-department';

describe('DeleteDepartment', () => {
  let component: DeleteDepartment;
  let fixture: ComponentFixture<DeleteDepartment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDepartment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDepartment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
