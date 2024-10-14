import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from './pipes/date.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { CartpageComponent } from './components/cartpage/cartpage.component';
import { ProductpageComponent } from './components/productpage/productpage.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DatePipe,
    FilterPipe,
    AdminpageComponent,
    CartpageComponent,
    ProductpageComponent,
    LoginpageComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
