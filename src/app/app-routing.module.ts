import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/product/create/create.component';
import { ReadComponent } from './components/product/read/read.component';
import { UpdateComponent } from './components/product/update/update.component';
import { DeleteComponent } from './components/product/delete/delete.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'read',
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'read',
    component: ReadComponent
  },
  {
    path: 'update/:id',
    component: UpdateComponent
  },
  {
    path: 'delete/:id',
    component: DeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
