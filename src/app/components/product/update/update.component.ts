import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  editForm!: FormGroup;

  constructor(private service: ProductService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.findById(parseInt(id!)).subscribe((product) => {
      console.log(product)
      this.editForm = this.formBuilder.group({
        id: [product.id],
        name: [product.name, Validators.compose([Validators.required, Validators.minLength(3)])],
        price: [product.price, Validators.required],
        imgUrl: [product.imgUrl, Validators.required]
      })
    })
  }

  update() {
    if(this.editForm.valid) {
      this.service.update(this.editForm.value).subscribe(() => {
        this.router.navigate(['/read'])
      })
    }
  }

  cancel() {
    this.router.navigate(['/read'])
  }

  disableButton(): string {
    console.log(`disableButton ${this.editForm.valid}`)
    if(this.editForm.valid) {
      return 'button'
    }
    return 'button__disabled'
  }
}
