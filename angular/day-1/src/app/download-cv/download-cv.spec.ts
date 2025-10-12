import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadCv } from './download-cv';

describe('DownloadCv', () => {
  let component: DownloadCv;
  let fixture: ComponentFixture<DownloadCv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadCv]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadCv);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
