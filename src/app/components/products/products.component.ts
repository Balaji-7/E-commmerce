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
    window.scrollTo(0, 0);
    this.productCategories = fetch.productCategories
  }

}
