import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // public islogin :boolean = false

  constructor(private route : Router,public fetch:FetchService){
    // this.islogin = this.fetch.userdetails.length ? true : false
  }

  home(){
    this.route.navigate(['home'])
  }
  menu(){
    this.route.navigate(['products'])
  }
  cart(){
    this.route.navigate(['cart'])
   
  }
  login(){
    console.log("Login  Page")
    this.route.navigate(['userinfo'])
  }
  profile(){
    this.route.navigate(['profile'])

  }
  opencategory(menuItem:any){
    console.log(menuItem)
  }
}
