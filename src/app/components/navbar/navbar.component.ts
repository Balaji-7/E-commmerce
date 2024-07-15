import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private route : Router){

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
  }


}
