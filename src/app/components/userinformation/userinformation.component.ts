import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userinformation',
  templateUrl: './userinformation.component.html',
  styleUrls: ['./userinformation.component.css']
})
export class UserinformationComponent implements OnInit {

public openreg:boolean =  false;

// public response :any

  constructor(public http:HttpClient) {

  }

  ngOnInit() {
   console.log(this.openreg)
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
