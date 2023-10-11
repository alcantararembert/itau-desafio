import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateComponent } from './update.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductService } from '../product.service';

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['findById', 'update']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: {
          get: () => '1', // Simulate an ID of 1 for testing
        },
      },
    });

    TestBed.configureTestingModule({
      declarations: [UpdateComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    });

    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product data on ngOnInit', () => {
    const mockProduct = {
      id: 1,
      name: 'Test Product',
      price: 19.99,
      imgUrl: 'https://test-image.jpg',
    };

    productService.findById.and.returnValue(of(mockProduct));

    component.ngOnInit();

    expect(productService.findById).toHaveBeenCalledWith(1);
    expect(component.editForm.value).toEqual(mockProduct);
  });

  it('should update the product', () => {
    const mockProduct = {
      id: 1,
      name: 'Updated',
      price: 39.99,
      imgUrl: 'https://test-image.jpg',
    };

    productService.update.and.returnValue(of(mockProduct));

    component.editForm.setValue(mockProduct);
    component.update();

    expect(productService.update).toHaveBeenCalledWith(mockProduct);
    expect(router.navigate).toHaveBeenCalledWith(['/read']);
  });

  it('should not update the product with an invalid form', () => {
    const invalidProduct = {
      id: 1,
      name: 'A',
      price: 19.99,
      imgUrl: 'https://test-image.jpg',
    };

    component.editForm.setValue(invalidProduct);

    component.update();

    expect(productService.update).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should cancel and navigate to /read', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/read']);
  });

  it('should disable the button when the form is invalid', () => {
    const invalidProduct = {
      id: 1,
      name: 'A',
      price: 19.99,
      imgUrl: 'https://test-image.jpg',
    };

    component.editForm.setValue(invalidProduct);

    const result = component.disableButton();

    expect(result).toBe('button__disabled');
  });

  it('should enable the button when the form is valid', () => {
    const validProduct = {
      id: 1,
      name: 'Valid Product',
      price: 19.99,
      imgUrl: 'https://test-image.jpg',
    };

    component.editForm.setValue(validProduct);

    const result = component.disableButton();

    expect(result).toBe('button');
  });
});