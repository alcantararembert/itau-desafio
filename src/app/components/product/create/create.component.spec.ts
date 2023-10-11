import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateComponent } from './create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductService } from '../product.service';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['create']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [CreateComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new product', () => {
    const mockProduct = {
      id: 1,
      name: 'Test',
      price: 19.99,
      imgUrl: 'https://test-image.jpg',
    };

    productService.create.and.returnValue(of(mockProduct));
    component.form.setValue(mockProduct);
    component.create();

    expect(productService.create).toHaveBeenCalledWith(mockProduct);
    expect(router.navigate).toHaveBeenCalledWith(['/read']);
  });

  it('should not create a product with an invalid form', () => {
    component.form.setValue({
      id: 1,
      name: 'A',
      price: 19.99,
      imgUrl: 'https://test-image.jpg',
    });

    component.create();

    expect(productService.create).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should cancel and navigate to /read', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/read']);
  });

  it('should disable the button when the form is invalid', () => {
    component.form.setValue({
      id: 1,
      name: 'A',
      price: 19.99,
      imgUrl: 'https://test-image.jpg',
    });

    const result = component.disableButton();

    expect(result).toBe('button__disabled');
  });

  it('should enable the button when the form is valid', () => {
    component.form.setValue({
      id: 1,
      name: 'Valid Product',
      price: 19.99,
      imgUrl: 'https://test-image.jpg',
    });

    const result = component.disableButton();

    expect(result).toBe('button');
  });
});