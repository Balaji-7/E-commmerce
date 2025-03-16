import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
declare var Razorpay:any;
@Injectable({
  providedIn: 'root'
})
export class FetchService {
  public backendUrl = "https://backend-qkn0.onrender.com/"

  public productCategories = [
    { name: "Mobiles", image: "https://img.freepik.com/free-vector/flat-design-smartphone-different-perspectives_52683-52558.jpg" },
    { name: "Electronics", image: "https://t3.ftcdn.net/jpg/01/76/97/56/360_F_176975606_NENcObythCwyPxA6n5vSKxwc8lVLa3In.jpg" },
    { name: "Beauty", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbCrita0LJdqfGbryAL2dk3T9HFe1t5zyJ1A&s" },
    { name: "Fashion", image: "https://static.toiimg.com/thumb/msid-103872472,imgsize-103834,width-400,resizemode-4/103872472.jpg" },
    { name: "Furniture", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcFT1vLJRfzn5PrO4I7wdqSkC7wZjUEr7kvQ&s" },
    { name: "Toys", image: "https://st2.depositphotos.com/4431055/11473/i/450/depositphotos_114730670-stock-illustration-toys-collection-isolated.jpg" },
    { name: "Groceries", image: "https://cdn.grabon.in/gograbon/images/web-images/uploads/1618548899692/groceries-offers.jpg" },
    { name: "Deals", image: "https://media.istockphoto.com/id/1262703823/vector/last-minute-limited-offer-with-clock-for-sale-promo-button-logo-or-banner-or-red-background.jpg?s=612x612&w=0&k=20&c=MkGZunBxsoz7yNA9jA2gDeP9yooqutV6Xuc44zv65tk=" },
    { name: "Home", image: "https://img.global.news.samsung.com/in/wp-content/uploads/2020/10/Festive-Offers-2-1024x576.jpg" },
    { name: "Appliances", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTffuZx6fpy6d_w_L-QZOANv0eJ62T7KUAG0w&s" },
    { name: "Books", image: "https://i.imgur.com/ODPdVqq.jpg" },
    { name: "Offers", image: "https://static.toiimg.com/thumb/msid-103872472,imgsize-103834,width-400,resizemode-4/103872472.jpg" }
  ];
  
  public isupdate: boolean = false
  public userdetails :any = []
  public cartitems: any = []
  public order:any
  public paymentid:any;
  public product :any = {
    "productname": "",
    "productimg" : "",
  }



  constructor(public route:Router,public http:HttpClient) { 
    console.log(this.userdetails)
    // this.userinfo = this.fetch.userdetails.length ? this.fetch.userdetails :  JSON.parse(localStorage.getItem("userinfo") as string)

    this.userdetails = localStorage.getItem("userinfo")  ? JSON.parse(localStorage.getItem("userinfo") as string) : this.userdetails
    if(this.userdetails.length >0){
      this.getcartitems()
    }
  }

  clearAllData(){
    localStorage.clear()
  }

  getcartitems(){
    let email = this.userdetails[0]['email']
    // this.http.get(`http://localhost:3000/api/cart/${email}`).subscribe((res:any)=>{
      this.http.get(`${this.backendUrl} + ${email}`).subscribe((res:any)=>{
      console.log("response",res)
      this.cartitems = res['res']
    },(err:any)=>{
      console.log("error",err)
    })
  }

  storecartitem(data?:any,isupdate?:Boolean){
    if(this.userdetails.length>0){
      let tobeadddata = this.cartitems.filter((ele:any)=> ele.productimg == data['productimg'])
      console.log("add",tobeadddata[0])

      tobeadddata[0]['name'] = this.userdetails[0]['name']
      tobeadddata[0]['email'] = this.userdetails[0]['email']
      console.log(tobeadddata)

      if(isupdate){
        // this.http.put("http://localhost:3000/api/cart",tobeadddata[0]).subscribe((response:any) =>{
          this.http.put(`${this.backendUrl}api/cart`,tobeadddata[0]).subscribe((response:any) =>{
          console.log("res",response)
        },(error:any)=>{
          console.log("error",error)
        })
      }else{
      this.http.post(`${this.backendUrl}api/cart`,tobeadddata[0]).subscribe((response:any) =>{
        // this.http.post("http://localhost:3000/api/cart",tobeadddata[0]).subscribe((response:any) =>{
        console.log("res",response)
      },(error:any)=>{
        console.log("error",error)
      })
    }
    }
  }

  deleteCartitem(product:any){
    let data :any= {}
    data['productimg'] = product['productimg'];
    data['email'] = this.userdetails[0]["email"]
    console.log("data",data)
    this.http.delete(`${this.backendUrl}api/cart`,data).subscribe((response:any) =>{
      // this.http.delete("http://localhost:3000/api/cart",data).subscribe((response:any) =>{
      console.log("response",response)
    },(error)=>{
      console.log(error)
    })
  }

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
