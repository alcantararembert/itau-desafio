import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteComponent } from './delete.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductService } from '../product.service';

describe('DeleteComponent', () => {
  let component: DeleteComponent;
  let fixture: ComponentFixture<DeleteComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['findById', 'delete']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: {
          get: () => '1', // Simulate an ID of 1 for testing
        },
      },
    });

    TestBed.configureTestingModule({
      declarations: [DeleteComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    });

    fixture = TestBed.createComponent(DeleteComponent);
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
      name: 'Test',
      price: 19.99,
      imgUrl: 'https://test-image.jpg',
    };

    productService.findById.and.returnValue(of(mockProduct));

    component.ngOnInit();

    expect(productService.findById).toHaveBeenCalledWith(1);
    expect(component.product).toEqual(mockProduct);
  });

  it('should delete the product', () => {
    const mockProduct = {
      id: 1,
      name: 'Test',
      price: 19.99,
      imgUrl: 'https://test-image.jpg',
    };

    productService.delete.and.returnValue(of(mockProduct));

    component.product = mockProduct;
    component.delete();

    expect(productService.delete).toHaveBeenCalledWith(mockProduct.id);
    expect(router.navigate).toHaveBeenCalledWith(['/read']);
  });

  // it('should not delete the product with no ID', () => {
  //   productService.delete.and.returnValue(of(mockProduct));
  //   component.delete();

  //   expect(productService.delete).not.toHaveBeenCalled();
  //   expect(router.navigate).not.toHaveBeenCalled();
  // });

  it('should cancel and navigate to /read', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/read']);
  });
});