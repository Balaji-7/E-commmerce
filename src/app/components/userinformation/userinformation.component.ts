import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-userinformation',
  templateUrl: './userinformation.component.html',
  styleUrls: ['./userinformation.component.css']
})
export class UserinformationComponent implements OnInit {

public openreg:boolean =  false;
public paymentid:any =""
// public response :any
public orders :any = []
public details =  [{
  "productname": "Vivo",
  "imgurl": "https://exstatic-in.vivo.com/Oz84QB3Wo0uns8j1/in/1713261480685/1d7088825285b6052a6220d99cd658f2.png_w860-h860.webp",
  "count": 1,
  "price": 25000,
  "isselected": true
}]
  constructor(public http:HttpClient,public fetch:FetchService) {

  }

  ngOnInit() {
   console.log(this.openreg)
    if(this.fetch.order){
    if(this.fetch.order.length>0){
      this.fetch.order.map((ele:any)=>{
        this.orders.push(ele)
      })
    }
    else{
      this.orders.push(this.fetch.order) 
      
    }
    this.paymentid = this.fetch.paymentid ? this.fetch.paymentid : ""
  //  this.fetch.order ? this.orders.push(this.fetch.order) : this.orders = [];
  //  this.fetch.order && this.fetch.order.length>0 ? this.orders = this.fetch.order : this.orders = []

  //  this.fetch.paymentid ?
  //  this.orders['paymentid'] ? this.orders['paymentid'] : this.fetch.paymentid
   console.log(this.orders)
  }
  //  this.http.get("https://fakestoreapi.com/products/category/men's clothing?limit=8").subscribe((res:any)=>{
  //   console.log(res)
  //   this.response = res
  //  })
  }
  register(){
    console.log("Register")
  }
  openlogin(){
    this.openreg = !this.openreg
  }
  login(){
    console.log("Login")
  }

  openregister(){
    this.openreg = !this.openreg
  }
  
}
