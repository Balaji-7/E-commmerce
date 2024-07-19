import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';

declare var Razorpay:any

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public productimg: any = []
  public cartitemscount: any = 0
  public carttotalamount: any = 0
  selectAllChecked: boolean = true;
  constructor(public fetch: FetchService,public route:Router) {

  }

  ngOnInit() {
    this.productimg = this.fetch.cartitems
    console.log(this.productimg)
    this.calculateCartAmount()
  }

  productcheckchanged(){
    this.selectAllChecked = this.productimg.forEach((item:any) => item.isselected);
    this.calculateCartAmount()
  }

  cartbuy(){
    var cartSelecteditems = this.productimg.filter((ele:any) => ele.isselected)

    console.log(cartSelecteditems)
    this.fetch.buy(Object(cartSelecteditems),this.carttotalamount)
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
      this.fetch.cartitems = this.productimg
    }
  }

  quantitycount(productname:string,opeartion:string){
    this.productimg.map((ele:any)=>{
      if(ele.productname == productname && opeartion == "increase"){
        ele.count +=1;
        this.calculateCartAmount()
      }else{
        ele.count >= 2 ? ele.count -=1 : ele.count =1
        this.calculateCartAmount()
      }
    })
  }


  buy(product:any){
    const res:any =  this.fetch.buy(product)
    console.log("resssss",res)
    if(res.length){
      this.route.navigate(['userinfo'])
    }
    
    
    // console.log(product)
    // const razorpayoptions = {
    //   description : 'sample Razorpay',
    //   currency : 'INR',
    //   amount : 30000,
    //   name:'Balaji',
    //   key:'rzp_test_TECe3q55ZXYBEQ',
    //   image : "https://img.lovepik.com/background/20211021/large/lovepik-electronic-science-and-technology-creative-background-image_401692442.jpg",
    //   customer : {
    //     name: 'Balaji',
    //     email: 'balaji2000@gmail.com',
    //     phone: '7383987645'
    //   },
    //   handler : this.handlePaymentResponse,
    //   theme:{
    //     color:'#f37254'
    //   },
    //   modal:{
    //     ondismiss: () => {
    //       console.log("dismissed")
    //     }
    //   }
    // }

    // const successCallback =  (paymentid:any) =>{
    //   window.alert()
    //   console.log(paymentid)
    // }

    // const failureCallback = (error:any) =>{
    //   window.alert()
    //   console.log("error",error)
    // }
    
    // Razorpay.open(razorpayoptions,successCallback,failureCallback)
  }

//  handlePaymentResponse(response:any) {
//     console.log("res", response);
//     if (response.error) {
//       console.error('Payment failed:', response.error);
//       window.alert('Payment failed: ' + response.error.description);
//     } else {
//       console.log('Payment successful!');
//       window.alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
//     }
//   }



  removeFromCart(productname:string){
    this.productimg = this.productimg.filter((ele:any)=> ele.productname != productname)
    this.calculateCartAmount()
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
    this.fetch.cartitems = this.productimg
  }

}
