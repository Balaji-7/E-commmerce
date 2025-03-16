import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-userinformation',
  templateUrl: './userinformation.component.html',
  styleUrls: ['./userinformation.component.css']
})
export class UserinformationComponent implements OnInit {

public openreg:boolean =  false;
public paymentid:any =""
public orders :any = []
public isupdate:boolean = false;
public userid :number = 0
public  formData:any = {
  name: "",
  email: "",
  password: "",
  mobile : "",
  street:"",
  city:"",
  state:"",
  country:"",
  pincode:"",
};

public useremail : any = "";
public password : any = "";
public readonlyfield:any ="";



public details =  [{
  "productname": "Vivo",
  "imgurl": "https://exstatic-in.vivo.com/Oz84QB3Wo0uns8j1/in/1713261480685/1d7088825285b6052a6220d99cd658f2.png_w860-h860.webp",
  "count": 1,
  "price": 25000,
  "isselected": true
}]



  constructor(public http:HttpClient,public fetch:FetchService,public route:Router) {

  }

  ngOnInit() {
  if(this.fetch.isupdate){
    this.readonlyfield = "readonlyclass"
    this.isupdate = this.fetch.isupdate 
    this.userid = this.fetch.userdetails[0]["id"]
    this.formData = { ...this.fetch.userdetails[0] }
    // this.formData = this.fetch.userdetails[0]
    console.log(this.formData)
    console.log(this.isupdate)
    return
  }

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

   console.log(this.orders)
  }
  //  this.http.get("https://fakestoreapi.com/products/category/men's clothing?limit=8").subscribe((res:any)=>{
  //   console.log(res)
  //   this.response = res
  //  })
  }
  register(form:NgForm){
    console.log("Register")
    console.log(this.formData); 

    delete(this.formData["id"])
    console.log("After Deletion of id",this.formData)
    if(this.isupdate){
      // this.http.put(`http://localhost:3000/api/users/${this.userid}`,this.formData).subscribe(
        this.http.put(`${this.fetch.backendUrl}api/users/${this.userid}`,this.formData).subscribe(
        (response:any) =>{
          console.log(response);
          if(response['message']){
            window.alert("Details are updated")
            this.formData["id"] = this.userid
          this.fetch.userdetails = [Object.assign({}, this.formData)]
            form.reset()
            this.route.navigate(['profile'])
          }
        }
      ),(error:any) =>{
        console.log(error);
        window.alert("Try Agian sometime....")
      }
    }
    else{
    // this.http.post("http://localhost:3000/api/users", this.formData).subscribe(
      this.http.post(`${this.fetch.backendUrl}api/users`, this.formData).subscribe(
      (response:any) => {
        console.log(response);
        if(response['message']) {
          window.alert("Account Created Successfully, Please Login...")
          form.reset()
          this.openreg = !this.openreg
        }
      },
      (error) => {
        console.error("Error:", error);
        if(error['error']['errormsg'] == "Duplicate Entry"){
          window.alert("User Already Exists. Please Login")
          form.reset()
        }
      }
    );
  }


  }
  openlogin(){
    this.openreg = !this.openreg
  }
  login(form:NgForm){
    console.log("Login")
    console.log(this.useremail)
    console.log(this.password)
    this.http.get(`${this.fetch.backendUrl}api/users/${this.useremail}`).subscribe((response:any) =>{
      // this.http.get(`http://localhost:3000/api/users/${this.useremail}`).subscribe((response:any) =>{
      console.log(response)
      if(response.length>0){
        if(response[0].password == this.password){
          window.alert("Sucessfully Login...")
          this.fetch.userdetails = response
          form.reset()
          this.fetch.getcartitems()
          this.route.navigate(['profile'])
        }else{
          window.alert("password is Incorrect")
          this.password = ""
        }
      }
    },(error) =>{
      console.log(error)
    })
  }

  openregister(){
    this.openreg = !this.openreg
  }
  
}
