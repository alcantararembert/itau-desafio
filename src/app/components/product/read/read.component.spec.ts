import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadComponent } from './read.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductService } from '../product.service';

describe('ReadComponent', () => {
  let component: ReadComponent;
  let fixture: ComponentFixture<ReadComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['read']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ReadComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(ReadComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on ngOnInit', () => {
    const mockProducts = [
      { id: 1, name: 'Test 1', price: 19.99, imgUrl: 'https://test-image1.jpg', },
      { id: 2, name: 'Test 2', price: 29.99, imgUrl: 'https://test-image2.jpg', },
    ];

    productService.read.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(productService.read).toHaveBeenCalledWith(component.currentPage, component.filter);
    expect(component.products).toEqual(mockProducts);
  });

  it('should load more products', () => {
    const mockMoreProducts = [
      { id: 3, name: 'Test 3', price: 29.99, imgUrl: 'https://test-image3.jpg' },
      { id: 4, name: 'Test 4', price: 79.99, imgUrl: 'https://test-image4.jpg' },
    ];

    productService.read.and.returnValue(of(mockMoreProducts));

    component.loadMoreProducts();

    expect(productService.read).toHaveBeenCalledWith(++component.currentPage, component.filter);
    expect(component.products).toEqual([...component.products, ...mockMoreProducts]);
  });

  it('should search for products', () => {
    const mockFilteredProducts = [
      { id: 5, name: 'Filtered Test 1', price: 29.99, imgUrl: 'https://test-image5.jpg' },
    ];

    component.filter = 'Filtered Test';
    productService.read.and.returnValue(of(mockFilteredProducts));

    component.searchingProducts();

    expect(productService.read).toHaveBeenCalledWith(1, component.filter);
    expect(component.products).toEqual(mockFilteredProducts);
  });

  it('should handle no more products when loading more', () => {
    productService.read.and.returnValue(of([]));

    component.loadMoreProducts();

    expect(component.moreProducts).toBe(false);
  });
});