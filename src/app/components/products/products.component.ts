import { Component } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  public productCategories:any
  
  constructor(public fetch:FetchService){
    this.productCategories = fetch.productCategories
  }

}
