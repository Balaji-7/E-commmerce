import { Component, OnInit } from '@angular/core';
import { skip } from 'rxjs';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public productimg: any = []
  public cartitemscount: any = 0
  public carttotalamount: any = 0
  // public checked = true
  selectAllChecked: boolean = true;
  constructor(public fetch: FetchService) {

  }

  ngOnInit() {
    this.productimg = this.fetch.cartitems
    console.log(this.productimg)
    this.calculateCartAmount()
  }

  isselect(){
    console.log("isselected")
  }
  productcheckchanged(){
    this.selectAllChecked = this.productimg.forEach((item:any) => item.isselected);
    this.calculateCartAmount()
  }

  selectallchanged(){
    
    if(this.selectAllChecked){
      this.productimg.forEach((item:any) => item.isselected = true);
      this.calculateCartAmount()
    }
    else{
      this.productimg.forEach((item:any) => item.isselected = false);
      this.cartitemscount = 0
      this.carttotalamount = 0
    }
  }

  calculateCartAmount(){
    this.cartitemscount = 0
    this.carttotalamount = this.productimg.filter((ele:any) => ele.isselected)
    .map((ele:any) => {
      this.cartitemscount +=1
      return ele.count * ele.price 
    }).reduce((val1:any, val2:any) => {
      return val1 + val2
    },0)
    console.log(this.carttotalamount)
  }

}
