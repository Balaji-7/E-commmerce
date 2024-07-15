import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  public productCategories = ["Mobiles","Electronics","Beauty","Fashion","Furniture","Toys","Groceries","Deals",
    "Home","Appliances","Books","Offers"];
  

  public cartitems: any = []

  public product :any = {
    "productname": "",
    "imgurl" : "",
  }



  constructor() { }
}
