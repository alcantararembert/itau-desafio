import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    imgUrl: ''
  }  
  constructor(private service: ProductService, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.findById(parseInt(id!)).subscribe(product => {
      this.product = product
    })
  }

  delete() {
    if (this.product.id) {
      this.service.delete(this.product.id).subscribe(() => {
        this.router.navigate(['/read'])
      })
    }
  }

  cancel() {
    this.router.navigate(['/read'])
  }
}
