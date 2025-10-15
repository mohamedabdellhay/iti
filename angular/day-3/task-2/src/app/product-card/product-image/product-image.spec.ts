import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImage } from './product-image';

describe('ProductImage', () => {
  let component: ProductImage;
  let fixture: ComponentFixture<ProductImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
