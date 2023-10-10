import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent {
  products: Product[] = [];
  currentPage: number = 1;
  moreProducts: boolean = true;
  filter: string = ''

  constructor(private service: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.service.read(this.currentPage, this.filter).subscribe(products => {
      this.products = products
    })
  }
  loadMoreProducts() {
    this.service.read(++this.currentPage, this.filter).subscribe(products => {
      this.products.push(...products)
      if (!products.length) {
        this.moreProducts = false
      }
    })
  }
  searchingProducts() {
    this.moreProducts = true;
    this.currentPage = 1;
    console.log(this.filter)
    this.service.read(this.currentPage, this.filter).subscribe(products => {
      this.products = products
    })
  }
}
