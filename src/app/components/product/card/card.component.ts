import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() product: Product = {
    id: 0,
    name: '',
    price: 0.0,
    imgUrl: ''
  }
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    
  }

  update() {
    this.router.navigate([`/update/${this.product.id}`])
  }
  
  delete() {
    this.router.navigate([`/delete/${this.product.id}`])
  }
}
