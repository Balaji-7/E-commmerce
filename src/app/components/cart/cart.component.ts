import { Component, OnInit } from '@angular/core';
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

  constructor(public fetch: FetchService) {

  }

  ngOnInit() {
    this.productimg = this.fetch.cartitems
    console.log(this.productimg)
    this.cartitemscount = this.productimg.length ? this.productimg.length : 0
    this.carttotalamount = this.productimg.map((ele:any) => {
      return ele.count * ele.price
    }).reduce((val1:any, val2:any) => {
      return val1 + val2
    })
    console.log(this.carttotalamount)
  }
}
