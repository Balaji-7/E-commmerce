import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductdetailviewComponent } from './components/productdetailview/productdetailview.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryComponent } from './components/category/category.component';
import { UserinformationComponent } from './components/userinformation/userinformation.component';


const routes: Routes = [
  {path:'', redirectTo:"/home", pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'products', component:ProductsComponent},
  {path:'productdetailview',component:ProductdetailviewComponent},
  {path:'cart',component:CartComponent},
  {path:'category',component:CategoryComponent},
  {path:'userinfo',component:UserinformationComponent},
  {path:'**', redirectTo:'/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
