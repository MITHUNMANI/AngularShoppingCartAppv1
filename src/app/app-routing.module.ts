import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductpageComponent } from './components/productpage/productpage.component';
import { CartpageComponent } from './components/cartpage/cartpage.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { authGuard } from './auth.guard';
const routes: Routes = [
  { path:'', redirectTo:'/products',pathMatch:'full'},
  { path:'products', component: ProductpageComponent},
  { path:'cart', component:CartpageComponent},
  { path:'login', component:LoginpageComponent},
  { path:'admin', component:AdminpageComponent,canActivate: [authGuard]},

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
