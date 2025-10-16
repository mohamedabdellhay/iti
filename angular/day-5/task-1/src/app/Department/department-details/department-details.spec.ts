import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDetails } from './department-details';

describe('DepartmentDetails', () => {
  let component: DepartmentDetails;
  let fixture: ComponentFixture<DepartmentDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
