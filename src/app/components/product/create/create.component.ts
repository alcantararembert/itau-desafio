import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  form!: FormGroup;

  constructor( private service: ProductService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      price: ['', Validators.required],
      imgUrl: ['', Validators.required]
    })
  }

  create() {
    if(this.form.valid) {
      this.service.create(this.form.value).subscribe(() => {
        this.router.navigate(['/read'])
      })
    }
  }

  cancel() {
    this.router.navigate(['/read'])
  }

  disableButton(): string {
    if(this.form.valid) {
      return 'button'
    }
    return 'button__disabled'
  }
}
