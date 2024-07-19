import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
declare var Razorpay:any;
@Injectable({
  providedIn: 'root'
})
export class FetchService {

  public productCategories = ["Mobiles","Electronics","Beauty","Fashion","Furniture","Toys","Groceries","Deals",
    "Home","Appliances","Books","Offers"];
  

  public cartitems: any = []
  public order:any
  public paymentid:any;
  public product :any = {
    "productname": "",
    "imgurl" : "",
  }



  constructor(public route:Router) { }


  buy(product:any,carttotalamount?:any){
    console.log(product)
    // if(product.length>0){
    //   this.order = product.map((ele:any) => ele)
    // }
    this.order = product;
    const razorpayoptions = {
      description : 'sample Razorpay',
      currency : 'INR',
      amount : carttotalamount? carttotalamount * 100 : product.price * 100,
      name:'Balaji',
      key:'rzp_test_TECe3q55ZXYBEQ',
      image : "https://cdn-icons-png.flaticon.com/512/3081/3081840.png",
      customer : {
        name: 'Balaji',
        email: 'balaji2000@gmail.com',
        phone: '7383987645'
      },
      handler : (response:any)=>{
        console.log(response)
        this.paymentid = response
        // this.order['paymentid'] = this.paymentid
        this.route.navigate(['userinfo'])

      },
      theme:{
        color:'#f37254'
      },
      modal:{
        ondismiss: () => {
          console.log("dismissed")
        }
      }
    }

    const successCallback =  (paymentid:any) =>{
      console.log(paymentid)
    }

    const failureCallback = (error:any) =>{
      console.log("error",error)
    }
    
    Razorpay.open(razorpayoptions,successCallback,failureCallback)
  
  
  }

  


}
