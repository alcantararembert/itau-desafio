import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UpdateComponent } from './components/product/update/update.component';
import { CreateComponent } from './components/product/create/create.component';
import { ReadComponent } from './components/product/read/read.component';
import { DeleteComponent } from './components/product/delete/delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonMoreComponent } from './components/product/read/button-more/button-more.component';
import { CardComponent } from './components/product/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UpdateComponent,
    CreateComponent,
    ReadComponent,
    DeleteComponent,
    ButtonMoreComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
